---
layout: layout

pagination:
    data: members
    size: 1
    alias: member
permalink: '/members/{{member.name | slugify}}-{{member.id}}.html'
---
{{ member.id }}<br>
{{ member.name }}<br>
{{ member.email }}  
