---

locale: pt
layout: page
title: Tag
image: /assets/icons/favicon-96x96.png
permalink: /pt/tag/

---

{% for tag in site.tags %}
  {% assign posts=tag[1] | where:"locale", page.locale %}
  {% assign qty=posts|size %}
  {% if qty > 0 %}
  <h2 id="{{ tag[0] | slugify }}">#{{ tag[0] }}</h2>
  {% endif %}
  {% for post in posts %}
  <div>
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <br>
      {{ post.description | truncatewords: 15 }}
    </li>
    {% for tag in post.tags %}
			<a class="tag" href="/tag/#{{ tag | slugify }}"><code>{{ tag }}</code></a>
		{% endfor %}
  </div>
  {% endfor %}
{% endfor %}