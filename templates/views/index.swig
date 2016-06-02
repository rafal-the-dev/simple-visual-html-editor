{% extends "../layouts/default.swig" %}

{% block css %}
	
{% endblock %}

{% block content %}
	<div class="container">
		<div class="row">
			<div class="col-md-12 col-lg-12">
				<div class="panel panel-default">
				  <div class="panel-body">
				    {% if user %}
				    	Witaj, {{ user.name.first }}
				    {% else %}
				    	Zaloguj się, aby tworzyć projekty.
				    {% endif %}
				  </div>
				</div>
			</div>
			<div class="col-md-12 col-lg-12">
				<div class="page-header">
				  <h3>Udostępnione projekty</h3>
				</div>
			</div>
			<div class="col-md-6 col-lg-6">
				<div class="list-group">
					{% for project in data.projects %}
						<a href="/zobacz/{{project.id}}" class="list-group-item">
						    {{ project.name }}
						</a>
					{% endfor %}
				</div>
			</div>
			<div class="col-xs-6 col-md-6">
			{% if data.totalPages > 1 %}
				<ul class="pagination">
					{% if data.previous %}
						<li>
							<a href="?page={{ data.previous }}">
								<span class="glyphicon glyphicon-chevron-left"></span>
							</a>
						</li>
					{% else %}
						<li class="disabled">
							<a href="?page=1">
								<span class="glyphicon glyphicon-chevron-left"></span>
							</a>
						</li>
                    {% endif %}

                	{% for p in Array(data.totalPages) %}
						<li class="{% if data.page == loop.index %}active{% endif %}">
							<a href="?page={% if loop.index == "..." %}{% if i %}{{ data.totalPages }}{% else %}1{% endif %}{% else %}{{ loop.index }}{% endif %}">{{ loop.index }}</a>
						</li>
					{% endfor %}

					{% if data.next %}
						<li>
							<a href="?page={{ data.next }}">
								<span class="glyphicon glyphicon-chevron-right"></span>
							</a>
						</li>
					{% else %}
						<li class="disabled">
							<a href="?page={{ data.totalPages }}">
								<span class="glyphicon glyphicon-chevron-right"></span>
							</a>
						</li>
					{% endif %}
				</ul>
			{% endif %}
			</div>
		</div>
	</div>
{% endblock %}
