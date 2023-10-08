from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

# init
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASE_DIR, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

dummy_data = [{'apolloStation': '11',
  'fileNumber': '1',
  'format': '0',
  'from': {'day': '202', 'hourMinute': '439', 'second': '20.334'},
  'numberOfBlocks': '602',
  'tapeSequenceNumber': '10001',
  'to': {'day': '203', 'hourMinute': '821', 'second': '26.185'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '2',
  'format': '0',
  'from': {'day': '202', 'hourMinute': '1808', 'second': '33.853'},
  'numberOfBlocks': '37',
  'tapeSequenceNumber': '10002',
  'to': {'day': '202', 'hourMinute': '1947', 'second': '4.774'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '3',
  'format': '0',
  'from': {'day': '203', 'hourMinute': '825', 'second': '35.706'},
  'numberOfBlocks': '589',
  'tapeSequenceNumber': '10003',
  'to': {'day': '204', 'hourMinute': '1205', 'second': '34.391'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '4',
  'format': '0',
  'from': {'day': '204', 'hourMinute': '1205', 'second': '35.595'},
  'numberOfBlocks': '607',
  'tapeSequenceNumber': '10004',
  'to': {'day': '205', 'hourMinute': '1420', 'second': '5.176'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '5',
  'format': '0',
  'from': {'day': '205', 'hourMinute': '1435', 'second': '13.324'},
  'numberOfBlocks': '458',
  'tapeSequenceNumber': '10005',
  'to': {'day': '206', 'hourMinute': '1738', 'second': '0.109'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '6',
  'format': '0',
  'from': {'day': '206', 'hourMinute': '1738', 'second': '1.281'},
  'numberOfBlocks': '554',
  'tapeSequenceNumber': '10006',
  'to': {'day': '207', 'hourMinute': '1840', 'second': '49.351'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '7',
  'format': '0',
  'from': {'day': '207', 'hourMinute': '1840', 'second': '50.559'},
  'numberOfBlocks': '479',
  'tapeSequenceNumber': '10007',
  'to': {'day': '208', 'hourMinute': '1618', 'second': '21.338'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '8',
  'format': '0',
  'from': {'day': '208', 'hourMinute': '1618', 'second': '54.549'},
  'numberOfBlocks': '414',
  'tapeSequenceNumber': '10008',
  'to': {'day': '209', 'hourMinute': '1059', 'second': '28.394'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '9',
  'format': '0',
  'from': {'day': '209', 'hourMinute': '1059', 'second': '27.754'},
  'numberOfBlocks': '174',
  'tapeSequenceNumber': '10009',
  'to': {'day': '209', 'hourMinute': '1851', 'second': '9.639'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '10',
  'format': '0',
  'from': {'day': '209', 'hourMinute': '1842', 'second': '5.395'},
  'numberOfBlocks': '592',
  'tapeSequenceNumber': '10010',
  'to': {'day': '210', 'hourMinute': '2143', 'second': '17.364'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '11',
  'format': '0',
  'from': {'day': '210', 'hourMinute': '2159', 'second': '50.086'},
  'numberOfBlocks': '540',
  'tapeSequenceNumber': '10011',
  'to': {'day': '211', 'hourMinute': '2238', 'second': '20.274'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '12',
  'format': '0',
  'from': {'day': '211', 'hourMinute': '2258', 'second': '10.881'},
  'numberOfBlocks': '545',
  'tapeSequenceNumber': '10012',
  'to': {'day': '213', 'hourMinute': '35', 'second': '45.755'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '13',
  'format': '0',
  'from': {'day': '212', 'hourMinute': '2346', 'second': '13.201'},
  'numberOfBlocks': '602',
  'tapeSequenceNumber': '10013',
  'to': {'day': '213', 'hourMinute': '2357', 'second': '15.037'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '14',
  'format': '0',
  'from': {'day': '213', 'hourMinute': '2357', 'second': '7.433'},
  'numberOfBlocks': '513',
  'tapeSequenceNumber': '10014',
  'to': {'day': '214', 'hourMinute': '2332', 'second': '40.399'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '15',
  'format': '0',
  'from': {'day': '214', 'hourMinute': '2332', 'second': '41.045'},
  'numberOfBlocks': '275',
  'tapeSequenceNumber': '10015',
  'to': {'day': '215', 'hourMinute': '1158', 'second': '51.375'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '16',
  'format': '0',
  'from': {'day': '231', 'hourMinute': '622', 'second': '26.279'},
  'numberOfBlocks': '652',
  'tapeSequenceNumber': '10017',
  'to': {'day': '232', 'hourMinute': '1146', 'second': '37.198'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '17',
  'format': '0',
  'from': {'day': '232', 'hourMinute': '1147', 'second': '29.725'},
  'numberOfBlocks': '551',
  'tapeSequenceNumber': '10018',
  'to': {'day': '233', 'hourMinute': '1255', 'second': '9.092'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '18',
  'format': '0',
  'from': {'day': '233', 'hourMinute': '1255', 'second': '10.137'},
  'numberOfBlocks': '533',
  'tapeSequenceNumber': '10019',
  'to': {'day': '234', 'hourMinute': '1259', 'second': '26.081'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '19',
  'format': '0',
  'from': {'day': '234', 'hourMinute': '1259', 'second': '34.538'},
  'numberOfBlocks': '529',
  'tapeSequenceNumber': '10020',
  'to': {'day': '235', 'hourMinute': '1331', 'second': '7.116'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '20',
  'format': '0',
  'from': {'day': '235', 'hourMinute': '1331', 'second': '8.346'},
  'numberOfBlocks': '572',
  'tapeSequenceNumber': '10022',
  'to': {'day': '236', 'hourMinute': '1524', 'second': '42.096'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '21',
  'format': '0',
  'from': {'day': '236', 'hourMinute': '1520', 'second': '39.340'},
  'numberOfBlocks': '614',
  'tapeSequenceNumber': '10023',
  'to': {'day': '237', 'hourMinute': '1902', 'second': '1.659'},
  'year': '1969'},
 {'apolloStation': '11',
  'fileNumber': '22',
  'format': '0',
  'from': {'day': '237', 'hourMinute': '1902', 'second': '1.660'},
  'numberOfBlocks': '165',
  'tapeSequenceNumber': '10024',
  'to': {'day': '238', 'hourMinute': '230', 'second': '0.512'},
  'year': '1969'}]

class MQuake(db.Model):
    apollo_station = db.Column(db.Integer)
    file_number = db.Column(db.Integer, primary_key=True)
    format = db.Column(db.Integer)
    from_day = db.Column(db.Integer)
    from_hourminute = db.Column(db.Integer)
    from_second = db.Column(db.Float)
    num_of_blocks = db.Column(db.Integer)
    tape_sequence_num = db.Column(db.Integer)
    to_day = db.Column(db.Integer)
    to_hourminute = db.Column(db.Integer)
    to_second = db.Column(db.Float)
    year = db.Column(db.Integer)

    def __init__(self, apollo_station, file_number, format, 
                 from_day, from_hourminute, from_second, num_of_blocks, 
                 tape_sequence_num, to_day, to_hourminute, to_second, year):
        self.apollo_station = apollo_station
        self.file_number = file_number
        self.format = format
        self.from_day = from_day
        self.from_hourminute = from_hourminute
        self.from_second = from_second
        self.num_of_blocks = num_of_blocks
        self.tape_sequence_num = tape_sequence_num
        self.to_day = to_day
        self.to_hourminute = to_hourminute
        self.to_second = to_second
        self.year = year

class MQuakeSchema(ma.Schema):
    class Meta:
        fields = ('apollo_station', 'file_number', 'format', 
                 'from_day', 'from_hourminute', 'from_second', 'num_of_blocks', 
                 'tape_sequence_num', 'to_day', 'to_hourminute', 'to_second', 'year')

mquake_schema = MQuakeSchema()
mquakes_schema = MQuakeSchema(many=True)

# save all data into db
@app.route('/add_data', methods=['GET'])
def add_data():
    try:
        exists = MQuake.query.all()
        if not exists:
            for entry in dummy_data:
                mquake = MQuake(int(entry['apolloStation']),
                                int(entry['fileNumber']),
                                int(entry['format']),
                                int(entry['from']['day']),
                                int(entry['from']['hourMinute']),
                                float(entry['from']['second']), 
                                int(entry['numberOfBlocks']),
                                int(entry['tapeSequenceNumber']),
                                int(entry['to']['day']), 
                                int(entry['to']['hourMinute']),
                                float(entry['to']['second']),
                                int(entry['year']))
                db.session.add(mquake)
                db.session.commit()
                print(entry)
            return jsonify({'message': 'Data is added successfully'}), 201
        else:
            return jsonify({'message': 'Data has already been initialized'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# get data for a specific apollo station
@app.route('/get_apollo<id>', methods=['GET'])
def get_apollo(id):
    results = MQuake.query.filter_by(apollo_station=id).all()
    data = mquakes_schema.dump(results)
    print(data)
    return jsonify(data)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='localhost', port=3000, debug=True)
