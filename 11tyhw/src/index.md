---
layout: layout
title: 11ty Homepage
author: Aidan Killeen
published: "2/3/2023"
---

# {{ title | uppercase }}

{{ products | totable }}







{{ author | slugify }}



## Blog

{% for blog in collections.blog %}

[{{ blog.data.title }}]({{ blog.url }})

{% endfor %}

## Sport
{% for item in collections.sport %}

    [{{ item.data.title }}]({{ item.url }})

{% endfor %}

## Tech
{% for item in collections.tech %}

    [{{ item.data.title }}]({{ item.url }})
    
{% endfor %}


by {{ author }}
{{ published }}



