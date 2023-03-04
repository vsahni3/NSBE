from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
import sql
from analysis import reply
from classification import classify

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
EMAIL = ['']

test_transcript = '''
Analyze the following input for racism:
Hi, how's it going?
I'm fine officer, how are you?
You are very articulate; you don't sound black.
Response:
'''

@app.route('/login/', methods=['POST'])
def login():
    EMAIL[0] = request.get_json()['email']
    email = EMAIL[0]
    try:
        sql.load_messages(email[:email.index('@')])
    except:
        sql.create_user_table(email[:email.index('@')])

    return jsonify({
        'response': 'Done'
    })


@app.route('/analyze/', methods=['POST'])
def analyze():
    transcript = request.get_json()['transcript']
    response = reply(transcript)
    class_response = classify(transcript)
    if EMAIL[0]:
        email = EMAIL[0]
        sql.insert_user(email[:email.index('@')], transcript, response, class_response)
        return jsonify({
        'response': 'Done'
        })
    else:
        return jsonify({
        'response': 'Not logged in.'
        })


@app.route('/report/', methods=['POST'])
def report():
    prompt = request.get_json()['prompt']
    if EMAIL[0]:
        try:
            sql.insert_map(prompt)
        except:
            
            sql.create_map_table()
            sql.insert_map(prompt)

        return jsonify({'response': 'done'})
    else:
        return jsonify({
        'response': 'Not logged in.'
        })


@app.route('/give_analysis/', methods=['GET'])
def give_analysis():
    if EMAIL[0]:
        email = EMAIL[0]
        user_data = sql.load_messages(email[:email.index('@')])
        return jsonify({'response': user_data})
    else:
        return jsonify({
        'response': 'Not logged in.'
        })


@app.route('/map/', methods=['GET'])
def map():
    if EMAIL[0]:
        try:
            full_map = sql.load_map()
        except:
            sql.create_map_table()
            full_map = sql.load_map()
        return jsonify({'response': full_map})
    else:
        return jsonify({
        'response': 'Not logged in.'
        })


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)







