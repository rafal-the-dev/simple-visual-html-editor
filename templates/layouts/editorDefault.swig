{% import "../mixins/flash-messages.swig" as FlashMessages %}

<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<title>{{ title|default("Edytor UX") }}</title>
		<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">

		<link href="/styles/site.min.css" rel="stylesheet">

		<link href="/styles/style.css" rel="stylesheet">

		{# This file provides the default styling for the KeystoneJS Content Editor #}
		{%- if user and user.canAccessKeystone -%}
			<link href="/keystone/styles/content/editor.min.css" rel="stylesheet">
		{%- endif -%}

		{# HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries
		   Safely remove this block if you are not targeting IE8 #}
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->

		{# Include template-specific stylesheets by extending the css block #}
		{%- block css %}{% endblock -%}

		{# Add any other template-specific HEAD tags by extending the head block #}
		{%- block head %}{% endblock %}
	</head>
	<body>

		{# HEADER #}

		<div class="backButton saveAlert">
			<div class="alert alert-success" role="alert">Zapisano poprawnie</div>
			<div class="alert alert-warning" role="alert">Błąd zapisu</div>
		</div>

		<nav class="navbar navbar-default navbar-fixed-top">
			<div class="container">
				<div class="row">
					<div class="col-md-1 col-lg-1 col-xs-1 ">
					</div>
					<div class="col-md-6 col-lg-6 col-xs-6 ">
						<a class="navbar-brand main-logo" href="/" title="Edytor UX">
							<span class="glyphicon glyphicon-refresh outside">
								<span class="glyphicon glyphicon-tint inside"></span>
							</span>
						</a>
						<h3>{{ data.project.name }}</h3>
					</div>
					<div class="col-md-5 col-lg-5 col-xs-5">
						<ul class="nav nav-pills">
							{% if user -%}
								<li class="navbar-right">
									<!--<form method="POST" action="/edytor/{{ data.project.id }}">
										<input type="hidden" name="action" value="updateItem">
										<input type="hidden" name="id" value="{{ data.project.id }}">-->
										<p class="navbar-btn">
											<a href="/zobacz/{{ data.project.id }}" role="button" class="btn btn-primary btn-sm viewProject">
												<span class="glyphicon glyphicon-blackboard"></span>
											</a>
										</p>
									<!--</form>-->
								</li>
								<li class="navbar-right">
									<!--<form method="POST" action="/edytor/{{ data.project.id }}">
										<input type="hidden" name="action" value="updateItem">
										<input type="hidden" name="id" value="{{ data.project.id }}">-->
										<p class="navbar-btn">
											<button type="button" class="btn btn-primary  btn-sm updateProject">
												<span class="glyphicon glyphicon-floppy-save  saveProject"></span>
											</button>
										</p>
									<!--</form>-->
								</li>
								<li class="navbar-right">
									<!--<form method="POST" action="/edytor/{{ data.project.id }}">
										<input type="hidden" name="action" value="updateItem">
										<input type="hidden" name="id" value="{{ data.project.id }}">-->
										<p class="navbar-btn">
											<button type="button" data-toggle="modal" data-target="#saveDescModal" class="btn btn-primary btn-sm ">
												<span class="glyphicon glyphicon-list-alt"></span>
											</button>
										</p>
									<!--</form>-->
								</li>
							{%- else -%}
								
							{%- endif %}
						</ul>
					</div>
				</div>
			</div>
		</nav>

		<div class="modal fade" id="saveDescModal" tabindex="-1" role="dialog" 
     aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <!-- Modal Header -->
		            <div class="modal-header">
		                <button type="button" class="close" 
		                   data-dismiss="modal">
		                       <span aria-hidden="true">&times;</span>
		                       <span class="sr-only">Close</span>
		                </button>
		                <h4 class="modal-title" id="myModalLabel">
		                    Informacje o projekcie
		                </h4>
		            </div>
		            
		            <!-- Modal Body -->
		            <div class="modal-body">
		                
		                <form id="descForm" method="post" action="javascript:void(0)" class="form-horizontal" role="form">
		                	<input type="hidden" name="action" value="saveDesc" />
		                  <div class="form-group">
		                    <label  class="col-sm-2 control-label"
		                              for="inputDescription">Opis</label>
		                    <div class="col-sm-10">
		                        <textarea name="description">{{ data.project.description }}</textarea>
		                    </div>
		                  </div>
		                  <div class="form-group">
		                    <label class="col-sm-2 control-label"
		                          for="inputPassword3" >Status</label>
		                    <div class="col-sm-10">
		                        <select name="status">
		                        	{% for status in data.statuses %}
		                        	<option {% if data.project.status == status %} selected="selected" {% endif %} value="{{status}}">{{status}}</option>
		                        	{% endfor %}
		                        </select>
		                    </div>
		                  </div>
		                </form>
		                
		            </div>
		            
		            <!-- Modal Footer -->
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default"
		                        data-dismiss="modal">
		                    Zamknij
		                </button>
		                <button type="button" class="btn btn-primary saveDesc">
		                    Zapisz zmiany
		                </button>
		            </div>
		        </div>
		    </div>
		</div>

		<div class="modal fade" id="templatesModel" tabindex="-1" role="dialog" 
     aria-labelledby="templatesModal" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <!-- Modal Header -->
		            <div class="modal-header">
		                <button type="button" class="close" 
		                   data-dismiss="modal">
		                       <span aria-hidden="true">&times;</span>
		                       <span class="sr-only">Close</span>
		                </button>
		                <h4 class="modal-title" id="templatesModal">
		                    Dostępne szablony
		                </h4>
		            </div>
		            
		            <!-- Modal Body -->
		            <div class="modal-body">
		                
		                <!-- Lista szablonów -->
		                <div class="templates">
		                	<div class="list-group list-group-horizontal">
		                	</div>
		                </div>
		                
		            </div>
		            
		            <!-- Modal Footer -->
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default"
		                        data-dismiss="modal">
		                    Zamknij
		                </button>
		            </div>
		        </div>
		    </div>
		</div>

		<div class="modal fade" id="backgroundsModal" tabindex="-1" role="dialog" 
     aria-labelledby="backgroundsModal" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <!-- Modal Header -->
		            <div class="modal-header">
		                <button type="button" class="close" 
		                   data-dismiss="modal">
		                       <span aria-hidden="true">&times;</span>
		                       <span class="sr-only">Close</span>
		                </button>
		                <h4 class="modal-title">
		                    Dostępne tła
		                </h4>
		            </div>
		            
		            <!-- Modal Body -->
		            <div class="modal-body">
		                
		                <!-- Lista szablonów -->
		                <div class="backgrounds">
		                	<div class="list-group list-group-horizontal">
		                		<div class="list-group-item"><img style="width:150px;" src="/backgrounds/b1.jpg" alt="Background" /></div>
		                		<div class="list-group-item"><img style="width:150px;" src="/backgrounds/b2.jpg" alt="Background" /></div>
		                		<div class="list-group-item"><img style="width:150px;" src="/backgrounds/b3.png" alt="Background" /></div>
		                		<div class="list-group-item"><img style="width:150px;" src="/backgrounds/b4.jpg" alt="Background" /></div>
		                		<div class="list-group-item"><img style="width:150px;" src="/backgrounds/b5.jpg" alt="Background" /></div>
		                		<div class="list-group-item"><img style="width:150px;" src="/backgrounds/b6.jpg" alt="Background" /></div>
		                	</div>
		                </div>
		                
		            </div>
		            
		            <!-- Modal Footer -->
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default"
		                        data-dismiss="modal">
		                    Zamknij
		                </button>
		            </div>
		        </div>
		    </div>
		</div>

		<div class="tool-bar">
			toolbar
	    </div>

		{# BODY #}
		<div id="editor">
			{# NOTE:
			   There is no .container wrapping class around body blocks to allow more flexibility in design.
			   Remember to include it in your templates when you override the intro and content blocks! #}

			{# The Intro block appears above flash messages (used for temporary information display) #}
			{%- block intro -%}{%- endblock -%}

			{# Flash messages allow you to display once-off status messages to users, e.g. form
			   validation errors, success messages, etc. #}
			{{ FlashMessages.renderMessages(messages) }}

			{# The content block should contain the body of your template"s content #}
			{%- block content -%}{%- endblock -%}
		</div>

		{# JAVASCRIPT #}

		<script data-main="/js/main" src="/js/require.js"></script>

		{# jQuery 1.11.1 is included by default, and required by both Bootstrap
			and the KeystoneJS Content Editor. If you are not targeting IE8,
			you can upgrade to 2.1.3 (also bundled) for better performance. #}
		<!--<script src="/js/jquery/jquery-1.11.2.min.js"></script>-->

		{# Customise which Bootstrap javascript files are served by including
			them specifically here, instead of bootstrap-3.3.4.min.js #}
		<!--<script src="/js/bootstrap/bootstrap-3.3.4.min.js"></script>-->

		{# The KeystoneJS Content Editor provides support for ks-editable data attributes,
			which generate links to edit content for users who can access Keystone #}
		{% if user and user.canAccessKeystone -%}
			<!--<script src="/keystone/js/content/editor.js"></script>-->
		{%- endif -%}

		{# Add scripts that are globally required by your site here. #}

		{# Include template-specific javascript files by extending the js block #}
		{%- block js -%}{%- endblock -%}
	</body>
</html>
