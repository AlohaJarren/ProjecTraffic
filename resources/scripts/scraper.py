from bs4 import BeautifulSoup
from selenium import webdriver

browser = webdriver.Chrome() #replace with .Firefox(), or with the browser of your choice
url = "http://www.goakamai.org/icx/pages/cameras.aspx"
browser.get(url) #navigate to the page
innerHTML = browser.execute_script("return document.body.innerHTML") #returns the inner HTML as a string
soup = BeautifulSoup(innerHTML,"html.parser") #.text.strip() HTML parser

cameraImgs = []
cameraName = []

camera = soup.find("div",attrs={"id":"cameraList"})

cameraImg = camera.findAll("img",attrs={"class":"camera"})

for cameras in cameraImg:
    cameraImgs.append(cameras.get("data-src"))
    cameraName.append(cameras.get("title"))

print(cameraImgs)
print(cameraName)