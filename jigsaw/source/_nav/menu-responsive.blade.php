<nav id="js-nav-menu" class="nav-menu hidden lg:hidden">
    <ul class="my-0">
        <li class="pl-4">
            <a
                title="{{ $page->siteName }} Blog"
                href="/blog"
                class="nav-menu__item text-red {{ $page->isActive('/blog') ? 'active text-brown' : '' }}"
            >Blog</a>
        </li>
        <li class="pl-4">
            <a
                title="{{ $page->siteName }} About"
                href="/about"
                class="nav-menu__item text-red {{ $page->isActive('/about') ? 'active text-brown' : '' }}"
            >About</a>
        </li>
    </ul>
</nav>
