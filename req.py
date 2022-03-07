import requests
import base64
import json

url = 'http://localhost:8000/video/044cbf2d9e94c1716dac2bfffeaeb527.mp4'
myobj = {'fist_name': 'Max',
         'last_name': 'Cao'
        }
file = {'file': ('image.JPG', open('image.JPG', 'rb'))}
# print(file)

# x = requests.post(url, json = myobj, files = file_)
# x = requests.post(url, files = file)
# x = requests.post(url, json = myobj)
x = requests.get(url)
print(x.content)

# with open(x.content) as f:
#         data = json.load(f)

# print(data)


