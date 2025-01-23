<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Cache;

class CacheHelper
{
    public function generateKey(string $prefix, array $params = []): string
    {
        ksort($params);
        $queryString = http_build_query($params);
        return "{$prefix}:{$queryString}";
    }

    public function remember(string $key, int $ttl, callable $callback)
    {
        return Cache::remember($key, $ttl, $callback);
    }

    public function invalidate(string $key): void
    {
        Cache::forget($key);
    }

    public function flush(): void
    {
        Cache::flush();
    }
}
