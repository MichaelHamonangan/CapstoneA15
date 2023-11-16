import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
import easyocr
import sys
import requests
import util 

# define constants
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

model_cfg_path = "model/cfg/darknet-yolov3.cfg"
model_weights_path = "model/weights/model.weights"
class_names_path = "model/class.names"

img_path = str(sys.argv[1])

def remove(string):
    return "".join(string.split())

def process_image_from_url(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            nparr = np.frombuffer(response.content, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            if img is not None:
                # Perform image processing operations here
                # For example, you can resize the image
                # load class names
                with open(class_names_path, 'r') as f:
                    class_names = [j[:-1] for j in f.readlines() if len(j) > 2]
                    f.close()

                # load model 
                net = cv2.dnn.readNetFromDarknet(model_cfg_path, model_weights_path)

                H, W, _ = img.shape
                
                # convert image
                blob = cv2.dnn.blobFromImage(img, 1 / 255, (416, 416), (0, 0, 0), True)

                # get detections
                net.setInput(blob)

                detections = util.get_outputs(net)

                # bboxes, class_ids, confidences
                bboxes = []
                class_ids = []
                scores = []

                for detection in detections:
                    # [x1, x2, x3, x4, x5, x6, ..., x85]
                    bbox = detection[:4]

                    xc, yc, w, h = bbox
                    bbox = [int(xc * W), int(yc * H), int(w * W), int(h * H)]

                    bbox_confidence = detection[4]

                    class_id = np.argmax(detection[5:])
                    score = np.amax(detection[5:])

                    bboxes.append(bbox)
                    class_ids.append(class_id)
                    scores.append(score)

                # apply nms
                bboxes, class_ids, scores = util.NMS(bboxes, class_ids, scores)

                # plot
                reader = easyocr.Reader(['en'])
                for bbox_, bbox in enumerate(bboxes):
                    xc, yc, w, h = bbox

                    """
                    cv2.putText(img,
                                class_names[class_ids[bbox_]],
                                (int(xc - (w / 2)), int(yc + (h / 2) - 20)),
                                cv2.FONT_HERSHEY_SIMPLEX,
                                7,
                                (0, 255, 0),
                                15)
                    """

                    license_plate = img[int(yc - (h / 2)):int(yc + (h / 2)), int(xc - (w / 2)):int(xc + (w / 2)), :].copy()

                    img = cv2.rectangle(img,
                                        (int(xc - (w / 2)), int(yc - (h / 2))),
                                        (int(xc + (w / 2)), int(yc + (h / 2))),
                                        (0, 255, 0),
                                        15)

                    license_plate_gray = cv2.cvtColor(license_plate, cv2.COLOR_BGR2GRAY)

                #    _, license_plate_thresh = cv2.threshold(license_plate_gray, 64, 255, cv2.THRESH_BINARY_INV)

                    output = reader.readtext(license_plate_gray)

                    temp = ""

                    for out in output:
                        text_bbox, text, text_score = out
                        if len(temp)>6:
                            break
                        if text_score > 0.2:
                            if len(text)>6:
                                temp = text  + " "
                                # with open('output.txt', 'a') as file:
                                #     # Write the string to the file
                                #     file.write(text + '\n')
                                break
                            text = remove(text)
                            temp = temp + text + " "
                    temp = temp[:-1]
                    print(temp)
            else:
                print("Failed to read the image")
        else:
            print(f"Failed to fetch the image. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")

img = process_image_from_url(img_path)

# plt.figure()
# plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

# plt.figure()
# plt.imshow(cv2.cvtColor(license_plate, cv2.COLOR_BGR2RGB))

# plt.figure()
# plt.imshow(cv2.cvtColor(license_plate_gray, cv2.COLOR_BGR2RGB))

# plt.figure()
# plt.imshow(cv2.cvtColor(license_plate_thresh, cv2.COLOR_BGR2RGB))
# plt.axis('off')

# img_name = img_name.replace(" ", "").rstrip(img_name[-4:]).upper()
# plt.savefig("output/"+img_name+"_output.jpg")
