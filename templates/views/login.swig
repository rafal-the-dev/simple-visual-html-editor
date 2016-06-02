{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container">
        <div class="row">

        	<div class="col-md-4 col-lg-4">
        	</div>
        	<div class="col-md-4 col-lg-4">
				{% if user %}
		            <p class="lead"> Hi #{user.name.first},</p>
		            <p class="lead">Jesteś już zalogowany.</p>
		            <div class="toolbar">
		                    {% if user.isAdmin %}
		                        <a href="/keystone" class="btn btn-primary">Administracja</a>
		                    	<a href="/keystone/signout" class="btn btn-cancel">Wyloguj się</a>
		                    {% endif %}
		            </div>

			    {% else %}
			    	<h1 >Zaloguj się</h1>
			    	<form action="" method="POST">
						<input type="hidden" name="{{tokenKey}}" value="{{tokenValue}}" />
						<div class="form-group">
							
							<label for="email">E-mail</label>
							<input type="text" name="email" placeholder="E-mail" class="form-control" />
							
						</div>

						<div class="form-group">
							
							<label for="password">Hasło</label>
							<input type="password" name="password" placeholder="Hasło" class="form-control" />
							
						</div>

						<div class="form-group">
							<span class="form-group">
								<button type="submit" class="btn btn-primary">Zaloguj</button>
							</span>
						</div>
					</form>
			    {% endif %}
			</div>

        </div>
    </div>

{% endblock %}

{% block js %}
	
	<script>
	//- Only focus the field after the shake animation is complete
    if messages && messages.error.length
            script setTimeout(function() { try { document.getElementById('email').focus(); } catch(e) {}; }, 800);
    else
            script try { document.getElementById('email').focus(); } catch(e) {};
    </script>

{% endblock %}

        
