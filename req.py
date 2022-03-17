# used to fetch authorized visitors' video for model training

import requests

filename = 'room1_Max_Cao.mp4'
url = 'http://391server-env.eba-6eyremyt.ca-central-1.elasticbeanstalk.com/video/' + filename

x = requests.get(url, allow_redirects=True)

open('./saved_video/' + filename, 'wb').write(x.content)


