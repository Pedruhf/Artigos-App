<template>
  <div class="stat">
    <div class="stat-icon">
      <i :class="icon" :style="style"></i>
    </div>
    <div class="stat-info">
      <span class="stat-title">{{ title }}</span>
      <span class="stat-value">{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stat",
  props: ["title", "value", "icon", "iconColor"],
  computed: {
    style() {
      return "color: " + (this.iconColor || "#000");
    },
  },
};
</script>

<style>
.stat {
  flex: 1;
  display: flex;

  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-right: 1.25rem;
  margin-bottom: 1.25rem;
  padding: 1.25rem;

  background: #121214;
  color: #FFF;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  display: flex;
  align-items: center;
}

.stat-icon i {
  font-size: 5rem;
}

.stat-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.stat-title {
  font-size: 1.2rem;
}

.stat-value {
  font-size: 2rem;
}
</style>
