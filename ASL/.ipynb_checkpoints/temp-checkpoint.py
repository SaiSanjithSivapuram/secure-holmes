import cv2
import tensorflow as tf
import numpy as np

# Load the H5 model
model = tf.keras.models.load_model('C:/Users/manub/OneDrive/Documents/GitHub/secure-holmes/ASL/asl_model.h5')

# Initialize the webcam
cap = cv2.VideoCapture(0)

# Check if the webcam is opened correctly
if not cap.isOpened():
    print("Error: Could not access the webcam.")
    exit()

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    if not ret:
        break

    # Make prediction
    predictions = model.predict(frame)

    # Process predictions (for example, if it's a classification model)
    predicted_class = np.argmax(predictions)

    # Display the predicted class on the frame
    label = f'Predicted Class: {predicted_class}'
    cv2.putText(frame, label, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    # Display the resulting frame
    cv2.imshow('Webcam Feed', frame)

    # Press 'q' to quit the loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()