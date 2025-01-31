from flask import Flask, render_template, Response, jsonify
import cv2
import threading
from deepface import DeepFace

app = Flask(__name__)

ref_img = "demo.jpg"

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

match_result = "Processing..."
lock = threading.Lock()

def verify_face(frame):
    """Runs DeepFace verification in a separate thread."""
    global match_result
    try:
        result = DeepFace.verify(frame, ref_img, enforce_detection=False)
        match = result["verified"]
        with lock:
            match_result = "Match: Yes" if match else "Match: No"
    except Exception as e:
        with lock:
            match_result = f"Error: {str(e)}"

def video_stream():
    """Generates webcam frames for streaming."""
    frame_count = 0
    thread_running = False

    while True:
        ret, frame = cap.read()
        if not ret:
            break

    
        if frame_count % 5 == 0 and not thread_running:
            thread_running = True
            thread = threading.Thread(target=verify_face, args=(frame.copy(),), daemon=True)
            thread.start()

        if not thread.is_alive():
            thread_running = False

    
        _, buffer = cv2.imencode(".jpg", frame)
        frame_bytes = buffer.tobytes()

        yield (b"--frame\r\n"
               b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n")

        frame_count += 1

@app.route("/")
def index():
    """Renders the homepage."""
    return render_template("index.html")

@app.route("/video_feed")
def video_feed():
    """Streams webcam video to the frontend."""
    return Response(video_stream(), mimetype="multipart/x-mixed-replace; boundary=frame")

@app.route("/get_match_result")
def get_match_result():
    """Returns the latest DeepFace match result."""
    with lock:
        return jsonify({"result": match_result})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
