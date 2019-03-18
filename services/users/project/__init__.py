import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_debugtoolbar import DebugToolbarExtension

db = SQLAlchemy()
toolbar = DebugToolbarExtension()

def create_app(script_info=None):

	#instatiate app
	app = Flask(__name__)

	#set config
	app_settings = os.getenv('APP_SETTINGS')
	app.config.from_object(app_settings)

	#set up exensions
	db.init_app(app)
	toolbar.init_app(app)

	#register blueprints
	from project.api.users import users_blueprint
	app.register_blueprint(users_blueprint)

	#shell context for flask cli
	@app.shell_context_processor
	def ctx():
		return dict(app=app, db=db)

	return app