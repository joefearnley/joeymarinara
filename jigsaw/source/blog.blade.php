---
title: Archives
description: The list of posts for the site
pagination:
    collection: posts
    perPage: 10
---
@extends('_layouts.master')

@section('body')

    @foreach ($pagination->items as $post)
        @include('_components.post-preview-inline')

        @if ($post != $pagination->items->last())
            <hr class="border-b my-6">
        @endif
    @endforeach

    @if ($pagination->pages->count() > 1)
        <nav class="flex justify-between text-base my-8">
            @if ($previous = $pagination->previous)
                <a
                    href="{{ $previous }}"
                    title="Previous Page"
                    class="rounded mr-3 px-5 py-3"
                >&LeftArrow; newer</a>
            @endif

            @if ($next = $pagination->next)
                <a
                    href="{{ $next }}"
                    title="Next Page"
                    class="rounded mr-3 px-5 py-3"
                >older &RightArrow;</a>
            @endif
        </nav>
    @endif
@stop
