{% extends "../layouts/editorDefault.swig" %}

{% block css %}
	<link href="/styles/editor.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="/styles/bootstrap/bootstrap-colorpicker.css">
	<link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Exo+2&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Codystar&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
{% endblock %}

{% block content %}
	
	<a href='#' class="collapseBtn btn btn-primary" id='justify-icon'>
		<span class='glyphicon glyphicon-align-justify'></span>
	</a>

	<nav class='sidebar sidebar-menu-expanded'>
		<ul class="superMenu">
			<li>
				<a class='expandable' href='#' title='Narzędzia'>
					<span class='glyphicon glyphicon-wrench collapsed-element'></span>
					<span class="expanded-element">Narzędzia</span>
				</a>
				<div class="first-tools-list">
					<button type="button" class="btn btn-default add-row">Dodaj wiersz</button>
					<button type="button" class="btn btn-default add-another">Dodaj blok</button>
				</div>
			</li>
			<li>
				<a class='expandable' href='#' title='APIs'>
					<span class='glyphicon glyphicon-wrench collapsed-element'></span>
					<span class='expanded-element'>APIs</span>
				</a>
				<div class="tools-object-list">
					<a class="btn btn-default menu-button" data-toggle="collapse" href="#form1" aria-expanded="false">
					    Szerokość bloku (1-12)
					</a>
					<div class="collapse tool-obj cols-change" id="form1">
						<form class="changeCol" action="javascript:void(0);">
							<input type="number" class="cols-number" min="1" max="12" value="12">
							<button type="submit" class="btn btn-default change-colls">Zmień</button>
						</form>
					</div>

					<a class="btn btn-default menu-button" data-toggle="collapse" href="#form3" aria-expanded="false">
					    Wysokość bloku (px)
					</a>
					<div class="collapse tool-obj height-change" id="form3">
						<form class="changeHeight" action="javascript:void(0);">
							<div class="input-group">
								<input type="number" class="height form-control" >
								<button type="submit" class="btn btn-default change-colls">Zmień</button>
							</div>
						</form>
					</div>

					<a class="btn btn-default menu-button" data-toggle="collapse" href="#form2" aria-expanded="false">
					    Tekst
					</a>
					<div class="collapse tool-obj text-change" id="form2">
						<form class="changeText" action="javascript:void(0);">
							<div class="input-group">
								<textarea class="form-control"></textarea>
								<button type="submit" class="btn btn-default change-colls">Zmień</button>
							</div>
						</form>
					</div>

					<a class="btn btn-default menu-button" data-toggle="collapse" href="#form7" aria-expanded="false">
					    Wielkość czcionki (px)
					</a>
					<div class="collapse tool-obj text-size-change" id="form7">
						<form class="changeTextSize" action="javascript:void(0);">
							<div class="input-group">
					            <input type="number" value="" class="form-control"/>
							</div>
							<button type="submit" class="btn btn-default change-colls">Zmień</button>
						</form>
					</div>

					<a class="btn btn-default menu-button" data-toggle="collapse" href="#form10" aria-expanded="false">
					    Styl czcionki
					</a>
					<div class="collapse tool-obj text-font-change" id="form10">
						<form class="changeTextFont" action="javascript:void(0);">
							<div class="input-group">
					            <select name="fontType" class="form-control">
					            	<option value="">Zwykła</option>
					            	<option value="Source Sans Pro">Source Sans Pro</option>
					            	<option value="Exo 2">Exo 2</option>
					            	<option value="Codystar">Codystar</option>
					        	</select>
							</div>
							<button type="submit" class="btn btn-default change-colls">Zmień</button>
						</form>
					</div>
						
					<a class="btn btn-default menu-button" data-toggle="collapse" href="#form9" aria-expanded="false">
						Marginesy (px)
					</a>
					<div class="collapse tool-obj padding-change" id="form9">
						<form class="changePaddingTextSize" action="javascript:void(0);">
							
							<label for="top" >Góra</label>
							<div class="input-group">
					            <input name="top" type="number" value="" class="form-control"/>
							</div>
							<label for="right" >Prawy</label>
							<div class="input-group">
					            <input name="right" type="number" value="" class="form-control"/>
							</div>
							<label for="bottom" >Dół</label>
							<div class="input-group">
					            <input name="bottom" type="number" value="" class="form-control"/>
							</div>
							<label for="left" >Lewy</label>
							<div class="input-group">
					            <input name="left" type="number" value="" class="form-control"/>
							</div>
							<button type="submit" class="btn btn-default change-colls">Zmień</button>
						</form>
					</div>

					<a class="btn btn-default menu-button" data-toggle="collapse" href="#form4" aria-expanded="false">
					    Zmień tło
					</a>
					<div class="collapse tool-obj height-change" id="form4">
						<form class="changeBackground" action="javascript:void(0);">
							<div class="input-group colorpicker-component demo demo-auto">
					            <input type="text" value="#00AABB" class="form-control"/>
					            <span class="input-group-addon"><i></i></span>
							</div>
							<button type="submit" class="btn btn-default change-colls">Zmień</button>
						</form>
					</div>

					<a class="btn btn-default menu-button" data-toggle="collapse" href="#form5" aria-expanded="false">
					    Zmień kolor tekstu
					</a>
					<div class="collapse tool-obj height-change" id="form5">
						<form class="changeColor" action="javascript:void(0);">
							<div class="input-group colorpicker-component demo demo-auto">
					            <input type="text" value="#00AABB" class="form-control"/>
					            <span class="input-group-addon"><i></i></span>
							</div>
							<button type="submit" class="btn btn-default change-colls">Zmień</button>
						</form>
					</div>

					<a class="btn btn-default menu-button" data-toggle="collapse" href="#form6" aria-expanded="false">
					    Zmień obraz tła
					</a>
					<div class="collapse tool-obj background-change" id="form6">
						<form class="changeBackgroundImage" action="javascript:void(0);">
							<div class="input-group">
					            <input type="text" value="" placeholder="http://" class="form-control"/>
							</div>
							<button type="button" data-toggle="modal" data-target="#backgroundsModal" class="btn btn-primary btn-sm ">
								<span class="glyphicon glyphicon-picture"></span>
							</button>
							<button type="submit" class="btn btn-default change-colls">Zmień</button>
						</form>
					</div>

					<a class="btn btn-danger menu-button removeButton" >
					    Usuń blok
					</a>

				</div>
			</li>
			<li>
				<a class='expandable' href='#' title='Szablony' data-toggle="modal" data-target="#templatesModel" >
					<span class='glyphicon glyphicon-credit-card collapsed-element'></span>
					<span class="expanded-element">Szablony</span>
				</a>
				<div class="tools-list list-group templates">
					
				</div>
			</li>
			<li class="template-section">
				<a class='expandable' href='#' title='Edytuj szablon'>
					<span class='glyphicon glyphicon-wrench collapsed-element'></span>
					<span class='expanded-element'>Edytuj szablon</span>
				</a>
				<div class="tools-template-list">
					<a class="btn btn-default menu-button" data-toggle="collapse" href="#form8" aria-expanded="false">
					    Marginesy (px)
					</a>
					<div class="collapse tool-obj padding-change" id="form8">
						<form class="changePaddingSize" action="javascript:void(0);">
							
							<label for="top" >Góra</label>
							<div class="input-group">
					            <input name="top" type="number" value="" class="form-control"/>
							</div>
							<label for="right" >Prawy</label>
							<div class="input-group">
					            <input name="right" type="number" value="" class="form-control"/>
							</div>
							<label for="bottom" >Dół</label>
							<div class="input-group">
					            <input name="bottom" type="number" value="" class="form-control"/>
							</div>
							<label for="left" >Lewy</label>
							<div class="input-group">
					            <input name="left" type="number" value="" class="form-control"/>
							</div>
							<button type="submit" class="btn btn-default change-colls">Zmień</button>
						</form>
					</div>

					<div class="tmpForm">
						<a class="btn btn-default menu-button" data-toggle="collapse" href="#formLast" aria-expanded="false">
	                        Zmień takst
	                    </a>
	                    <div class="collapse tool-obj height-change" id="formLast">
	                        <form class="templateTextChange" action="javascript:void(0);">
	                            <div class="input-group">
	                                <textarea class="form-control"></textarea>
	                            </div>
	                            <button type="submit" class="btn btn-default change-colls">Zmień</button>
	                        </form>
	                    </div>
                	</div>

                	<a class="btn btn-default menu-button repeatItem" >Powiel element</a>

					<a class="btn btn-danger menu-button removeTemplateButton" >
					    Usuń szablon
					</a>
				</div>

			</li>
		</ul>
		
		<a class="removeChecked" id='logout-icon' title='Remove checked'>
			<span class='glyphicon glyphicon-remove'></span>
		</a>
	</nav>

	<div class="container">
		<div class="editor-number">{{ data.project.id }}</div>
		<div id="editor-block">
			{% autoescape false %}
				{{ data.project.html }}
			{% endautoescape %}
		</div>
	</div>
	
{% endblock %}

{% block js %}
	<!--<script src="/js/socket.io.js"></script>-->
	<!--<script src="/js/bootstrap/bootstrap-colorpicker.js"></script>
	<script src="/js/jquery.cookie.js"></script>
	<script src="/js/custom.js"></script>-->
{% endblock %}

