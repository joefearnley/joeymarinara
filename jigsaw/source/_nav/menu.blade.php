<nav class="hidden lg:flex items-center justify-end text-lg">
    <a title="{{ $page->siteName }} Blog" href="/blog"
        class="ml-6 text-red {{ $page->isActive('/blog') ? 'active text-brown' : '' }}">
        Blog
    </a>

    <a title="{{ $page->siteName }} About" href="/about"
        class="ml-6 text-red {{ $page->isActive('/about') ? 'active text-brown' : '' }}">
        About
    </a>
</nav>
