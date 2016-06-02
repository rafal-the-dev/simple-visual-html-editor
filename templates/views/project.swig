{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container">
		<div class="row">
  			<div class="col-xs-6 col-md-4">
					<h1>Projekty
					</h1>
			</div>
			<div class="col-xs-6 col-md-8">
				<div class="media">
					<div class="media-body">
					</div>
		  			<div class="media-right">
		  			<form action="/edytor" method="POST">
		  				<input type="hidden" name="action" value="create" />
		  				<div class="input-group">
							<input type="text" name="name" placeholder="Nazwa" class="form-control main-input-size" />
							<span class="input-group-btn">
								<button class="btn btn-primary"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Nowy projekt</button>
							</span>
						</div>
					</form>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-xs-12 col-md-12">
				<table class="table table-bordered">
					<thead>
	                <tr>
	                  <th>Nazwa</th>
	                  <th>Autor</th>
	                  <th>Opis</th>
	                  <th>Status</th>
	                  <th>Widoczność</th>
	                  <th>Stworzony</th>
	                  <th>Akcje</th>
	                </tr>
	              </thead>
	              <tbody>
	              		{% for project in data.projects %}
	              		<tr>
							<td><a href="/edytor/{{ project.id }}">{{ project.name }}</a></td>
							<td>{{ project.author.name.first }} {{ project.author.name.last }}</td>
							<td>{{ project.description }}</td>
							<td>{{ project.status }}</td>
							<td>{% if project.visible %}TAK{% else%}NIE{% endif %}</td>
							<td>{{ project.created|date('Y-m-d H:i:s') }}</td>
							<td>
								<a title="Edytuj" href="/edytor/{{ project.id }}" class="btn btn-primary btn-sx" role="button"><span class=" glyphicon glyphicon-edit"></span></a>
								<button data-id="{{ project.id }}" type="button" class="btn btn-danger  btn-sm deleteProject">
									<span class="glyphicon glyphicon-remove"></span>
								</button>
							</td>
						<tr>
						{% endfor %}
	              </tbody>
				
				</table>
			</div>
		</div>

		<div class="row">
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


{% block js %}
	<script src="/js/projects-list.js"></script>
{% endblock %}


