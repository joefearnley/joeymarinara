@extends('_layouts.master')

@section('body')
    <div class="w-full mb-6 text-center">
        <div>
            <img src="/assets/img/joey_marinara.png" alt="Joey Marinara">
        </div>
    </div>

    @foreach ($posts->take(6) as $post)
        <div class="w-full mb-6">
            @if ($post->cover_image)
                <img src="{{ $post->cover_image }}" alt="{{ $post->title }} cover image" class="mb-6">
            @endif

            <p class="text-gray-700 font-medium my-2">
                {{ $post->getDate()->format('F j, Y') }}
            </p>

            <h2 class="text-3xl mt-0">
                <a href="{{ $post->getUrl() }}" title="Read {{ $post->title }}" class="text-gray-900 font-extrabold">
                    {{ $post->title }}
                </a>
            </h2>

            <p class="mt-0 mb-4">{!! $post->getExcerpt() !!}</p>

            <a href="{{ $post->getUrl() }}" title="Read - {{ $post->title }}" class="uppercase tracking-wide mb-4">
                Read
            </a>
        </div>

        @if (! $loop->last)
            <hr class="border-b my-6">
        @endif
    @endforeach
@stop
