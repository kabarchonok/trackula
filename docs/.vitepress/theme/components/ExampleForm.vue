<script setup>
function onSubmit(event) {
  event.preventDefault()

  alert('Et voilà!')
}
</script>

<template>
  <div class="example-form">
    <form class="example-form__form" @submit="onSubmit">
      <div class="trackula-input">
        <label for="input-text" class="trackula-input__label">Text Input:</label>
        <input id="input-text" class="trackula-input__control" autocomplete="off" type="text">
      </div>

      <div class="trackula-input">
        <label class="trackula-input__label" for="select">Select Box:</label>

        <select id="select" class="trackula-input__control">
          <option value="option1">
            Option 1
          </option>
          <option value="option2">
            Option 2
          </option>
          <option value="option3">
            Option 3
          </option>
        </select>
      </div>

      <div class="trackula-input">
        <label class="trackula-input__label" for="textarea">Textarea:</label>
        <textarea id="textarea" class="trackula-input__control" rows="4" />
      </div>

      <button class="trackula-button">
        example button
      </button>
    </form>
  </div>
</template>

<style scoped>
.example-form {
  padding: 20px 24px;
}

.example-form__form {
  display:flex;
  flex-direction: column;
  gap: 24px
}
</style>
