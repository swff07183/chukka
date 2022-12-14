import sys
import time
import logging
import numpy as np
import cv2
import tensorflow as tf
import pandas as pd

from tf_pose import common
from tf_pose.estimator import TfPoseEstimator
from tf_pose.networks import get_graph_path, model_wh
import matplotlib.pyplot as plt
from sklearn.preprocessing import Normalizer
import warnings
warnings.filterwarnings('ignore')


camera = 0
resize = '432x368'     # resize images before they are processed
resize_out_ratio = 4.0  # resize heatmaps before they are post-processed
model = 'mobilenet_v2_large'
show_process = False
tensorrt = False       # for tensorrt process


w, h = model_wh(resize)
if w > 0 and h > 0:
    e = TfPoseEstimator(get_graph_path(
        model), target_size=(w, h), trt_bool=False)
else:
    e = TfPoseEstimator(get_graph_path(
        model), target_size=(432, 368), trt_bool=False)
print('********* Model Ready *************')


def dance_video_processing(video_path=r'dance_video/dancer.mp4', showBG=True):


def dance_video_processing(video_path=r'dance_video/dancer.mp4', showBG=True):

    cap = cv2.VideoCapture(video_path)
    video_fps = cap.get(cv2.CAP_PROP_FPS)
    # delay 추가, 실제 비디오 fps로 조절함
    # print(f'"delay" {delay}')
    # delay = int(100)

    if cap.isOpened() is False:
        print("Error opening video stream or file")

    # prev_time = 0 -> 맨처음 시간 초기화 수정
    # prev_time = time.time()
    FPS = 1
    # FPS = 2/3
    keypoints_list = []

    cnt = 0

    while True:
        ret_val, image = cap.read()
        # img_current_time = time.time() - img_prev_time
        dim = (368, 428)

        cnt += 1
        if (ret_val is True) and cnt % int(video_fps/FPS) == 0:
            print(cnt)
            image = cv2.resize(image, dim, interpolation=cv2.INTER_AREA)
            humans = e.inference(image,
                                 resize_to_default=(w > 0 and h > 0),
                                 upsample_size=4.0)
            if not showBG:
                image = np.zeros(image.shape)

            image = TfPoseEstimator.draw_humans(image, humans, imgcopy=False)
            npimg = np.copy(image)
            image_h, image_w = npimg.shape[:2]
            centers = {}

            for human in humans:
                for i in range(common.CocoPart.Background.value):
                    if i not in human.body_parts.keys():
                        # print(i)
                        continue
                    body_part = human.body_parts[i]
                    x_axis = int(body_part.x * image_w + 0.5)
                    y_axis = int(body_part.y * image_h + 0.5)
                    center = [x_axis, y_axis]
                    centers[i] = center
                # 수정 : 한 묶음이 append 되도록 수정
                # print(centers)
            keypoints_list.append(centers)

            # cv2.putText(image, "FPS: %f" % (1.0 / (time.time() - prev_time)), (10, 10),
            #             cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

            # cv2.imshow('Dancer', image)

            # cv2.waitKey(int(delay-(b-a)*1000))

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        elif (ret_val is False):
            break
        else:
            pass

    print(len(keypoints_list))
    cap.release()
    cv2.destroyAllWindows()
    return keypoints_list


def get_position(video_path, showBG=True):
    keypoints_list = dance_video_processing(video_path)
    # df = pd.DataFrame(keypoints_list)
    # df.to_csv("keypoints_list",index=False )

    # data = pd.read_csv("keypoints_list.csv",delimiter="\t")

    keyp_list = []
    # print(len(keypoints_list))
    # Preprocessing of the keypoints data
    for i in range(0, len(keypoints_list)):
        k = -2
        features = [0]*36
        for j in range(0, 18):
            k = k+2
            try:
                if k >= 36:
                    break
                features[k] = keypoints_list[i][j][0]
                features[k+1] = keypoints_list[i][j][1]
            except:
                features[k] = 0
                features[k+1] = 0
        keyp_list.append(features)  # features : 한 프레임의 position 값
    column_names = []
    for i in range(36):
        column_names.append(str(i))
    data = pd.DataFrame(keyp_list, columns=column_names)
    return data, keyp_list


songId = "3"
baseURL = "https://chukkachukka.s3.ap-northeast-2.amazonaws.com/game/video/"


data, keyp_list = get_position(video_path=baseURL+songId)
# data,keyp_list=get_position(video_path= r'dance_video/soojin.mp4')
data.to_csv(f'./pose_data/{songId}.csv', index=False, header=False)
# data = pd.read_csv("dancer_keyp_list.csv",delimiter=",")
# print(data)

songId = "4"
data,keyp_list=get_position(video_path= baseURL+songId)
data.to_csv(f'./pose_data/{songId}.csv', index=False, header=False)
songId = "5"
data,keyp_list=get_position(video_path= baseURL+songId)
data.to_csv(f'./pose_data/{songId}.csv', index=False, header=False)
songId = "6"
data,keyp_list=get_position(video_path= baseURL+songId)
data.to_csv(f'./pose_data/{songId}.csv', index=False, header=False)
songId = "7"
data,keyp_list=get_position(video_path= baseURL+songId)
data.to_csv(f'./pose_data/{songId}.csv', index=False, header=False)
