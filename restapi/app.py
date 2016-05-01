#!/usr/bin/env python2
from flask import Flask, request
from flask_restful import Resource, Api
from flask.ext.cors import CORS
import shelve
import sys

d = shelve.open('data.db',writeback=True)
app = Flask(__name__)
api = Api(app)
CORS(app)

class Getter(Resource):
    def get(self):
        return d['tasks']

api.add_resource(Getter, '/get')

class Receiver(Resource):
    def put(self):
        d['tasks'].insert(0, request.json)

api.add_resource(Receiver, '/put')

class Deleter(Resource):
    def put(self):
        print "memessss " + request.data
        d['tasks'].pop(int(request.data))

api.add_resource(Deleter, '/del')

# functinoality can be replaced by edit function
class Switcher(Resource):
    def put(self):
        print d['tasks'][int(request.data)]
        m = bool(d['tasks'][int(request.data)]['done'])
        d['tasks'][int(request.data)]['done'] = not m

api.add_resource(Switcher, '/switch')

# add edit function that takes a number (in url) and new data to replac the task[urldata] with

class Edit(Resource):
    def put(self, urlnum):
        d['tasks'][urlnum] = request.data

api.add_resource(Edit, '/edit/<int:urlnum>')

if __name__ == '__main__':
    try:
        app.run(debug=True)
    finally:
        d.close()
        sys.exit()
