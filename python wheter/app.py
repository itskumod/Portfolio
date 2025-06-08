from flask import Flask, render_template, request
import requests

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    weather = None
    if request.method == 'POST':
        city = request.form['city']
        api_key = 'e4e155b4777542924021a6d3bf9384f8'
        url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'
        response = requests.get(url).json()
        if response.get('main'):
            weather = {
                'city': city,
                'temperature': response['main']['temp'],
                'description': response['weather'][0]['description']
            }
    return render_template('index.html', weather=weather)
