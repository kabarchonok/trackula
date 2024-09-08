<template>
  <div class="not-found">
    <p class="not-found__code">
      404
    </p>

    <h1 class="visually-hidden">
      Page not found
    </h1>

    <span class="not-found__title">
      I&rsquo;m sorry but your vampire <br> is&nbsp;in&nbsp;another castle.
    </span>

    <div class="not-found__divider" />

    <div class="not-found__action">
      <a class="not-found__link" href="/" aria-label="go to home">Start the adventure again</a>
    </div>

    <img class="not-found__image" src="/404.png" alt="">
  </div>
</template>

<style scoped>
.not-found {
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 64px 24px 0;
}

.not-found__code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
}

.not-found__title {
  padding-top: 12px;
  letter-spacing: 2px;
  line-height: 24px;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}

.not-found__divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.not-found__action {
  padding: 20px 0 0 0;
}

.not-found__link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: border-color .25s, color .25s;
}

.not-found__link:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2)
}

.not-found__image {
  padding: 20px 0 0 0;
  margin: auto 0 0 0;
  width: 100%;
  max-width: 680px;
  pointer-events: none;
  user-select: none;
}
</style>
