{% extends "../layouts/previewLayout.swig" %}

{% block css %}
	<link href="/styles/editor.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="/styles/bootstrap/bootstrap-colorpicker.css">
{% endblock %}

{% block content %}
<div class="container">

<div class="backButton">
{% if user.id === data.project.author.id %}
	<a href="/edytor/{{data.project.id}}" class="btn btn-primary">
		<span class='glyphicon glyphicon-menu-left'></span>
	</a>

{% else %}

	<a href="/" class="btn btn-primary">
		<span class='glyphicon glyphicon-menu-left'></span>
	</a>

{% endif %}
</div>

{% autoescape false %}
	{{ data.project.html }}
{% endautoescape %}
</div>

{% endblock %}