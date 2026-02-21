<!--
  Settings Page
  
  User profile & notification preferences.
  Demonstrates form handling, toggles, and reactive state management.
-->

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

useSeoMeta({
  title: 'Settings | SaaS Analytics'
})

const { user } = useAuth()

// Form state
const profile = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
  timezone: 'UTC-5',
  language: 'en'
})

const notifications = reactive({
  emailReports: true,
  weeklyDigest: true,
  alertThresholds: false,
  marketingEmails: false
})

const saving = ref(false)
const saved = ref(false)

const saveProfile = async () => {
  saving.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800))
  saving.value = false
  saved.value = true
  setTimeout(() => saved.value = false, 2500)
}

const timezones = [
  'UTC-12', 'UTC-11', 'UTC-10', 'UTC-9', 'UTC-8', 'UTC-7', 'UTC-6', 'UTC-5',
  'UTC-4', 'UTC-3', 'UTC-2', 'UTC-1', 'UTC+0', 'UTC+1', 'UTC+2', 'UTC+3',
  'UTC+4', 'UTC+5', 'UTC+5:30', 'UTC+6', 'UTC+7', 'UTC+8', 'UTC+9', 'UTC+10',
  'UTC+11', 'UTC+12'
]
</script>

<template>
  <div class="settings-page space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-primary">Settings</h1>
      <p class="text-secondary text-sm mt-1">Manage your account preferences.</p>
    </div>

    <!-- Profile Section -->
    <section class="settings-section card">
      <div class="section-header">
        <h2 class="section-title">Profile</h2>
        <p class="section-desc">Your personal information and preferences.</p>
      </div>

      <form @submit.prevent="saveProfile" class="settings-form">
        <!-- Avatar -->
        <div class="avatar-row">
          <div class="avatar-circle">
            {{ profile.name.charAt(0).toUpperCase() }}
          </div>
          <div>
            <p class="text-sm font-medium text-primary">{{ profile.name }}</p>
            <p class="text-xs text-muted">{{ user?.role }} account</p>
          </div>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label class="label">Full Name</label>
            <input v-model="profile.name" type="text" class="input" placeholder="Your name" />
          </div>
          
          <div class="form-group">
            <label class="label">Email Address</label>
            <input v-model="profile.email" type="email" class="input" placeholder="you@example.com" />
          </div>
          
          <div class="form-group">
            <label class="label">Timezone</label>
            <select v-model="profile.timezone" class="input">
              <option v-for="tz in timezones" :key="tz" :value="tz">{{ tz }}</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="label">Language</label>
            <select v-model="profile.language" class="input">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="saving">
            <svg v-if="saving" class="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
          <span v-if="saved" class="save-toast">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Saved successfully
          </span>
        </div>
      </form>
    </section>

    <!-- Notifications Section -->
    <section class="settings-section card">
      <div class="section-header">
        <h2 class="section-title">Notifications</h2>
        <p class="section-desc">Choose what you'd like to be notified about.</p>
      </div>

      <div class="notification-list">
        <div class="notification-item">
          <div>
            <p class="notif-title">Email Reports</p>
            <p class="notif-desc">Receive completed report files via email.</p>
          </div>
          <label class="toggle">
            <input type="checkbox" v-model="notifications.emailReports" />
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="notification-item">
          <div>
            <p class="notif-title">Weekly Digest</p>
            <p class="notif-desc">Get a summary of your dashboard metrics every Monday.</p>
          </div>
          <label class="toggle">
            <input type="checkbox" v-model="notifications.weeklyDigest" />
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="notification-item">
          <div>
            <p class="notif-title">Alert Thresholds</p>
            <p class="notif-desc">Notify when metrics cross defined thresholds.</p>
          </div>
          <label class="toggle">
            <input type="checkbox" v-model="notifications.alertThresholds" />
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="notification-item">
          <div>
            <p class="notif-title">Marketing Emails</p>
            <p class="notif-desc">Receive product updates and tips.</p>
          </div>
          <label class="toggle">
            <input type="checkbox" v-model="notifications.marketingEmails" />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </section>

    <!-- Danger Zone -->
    <section class="settings-section card danger-section">
      <div class="section-header">
        <h2 class="section-title text-error">Danger Zone</h2>
        <p class="section-desc">Irreversible account actions.</p>
      </div>
      
      <div class="flex gap-3">
        <button class="btn btn-secondary btn-sm">Export All Data</button>
        <button class="btn btn-sm danger-btn">Delete Account</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.section-header {
  margin-bottom: var(--spacing-6);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-1);
}

.section-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* Avatar */
.avatar-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-6);
  border-bottom: 1px solid var(--color-border);
}

.avatar-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), #818cf8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: white;
}

/* Form */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin-top: var(--spacing-6);
  padding-top: var(--spacing-6);
  border-top: 1px solid var(--color-border);
}

.save-toast {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  color: var(--color-success);
  animation: fadeIn 200ms ease;
}

/* Notifications */
.notification-list {
  display: flex;
  flex-direction: column;
}

.notification-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4) 0;
  border-bottom: 1px solid var(--color-border);
}

.notification-item:last-child {
  border-bottom: none;
}

.notif-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.notif-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-top: 2px;
}

/* Toggle Switch */
.toggle {
  position: relative;
  display: inline-flex;
  cursor: pointer;
}

.toggle input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  width: 42px;
  height: 24px;
  border-radius: 12px;
  background-color: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  transition: all var(--transition-fast);
  position: relative;
}

.toggle-slider::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--color-text-muted);
  top: 2px;
  left: 2px;
  transition: all var(--transition-fast);
}

.toggle input:checked + .toggle-slider {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.toggle input:checked + .toggle-slider::after {
  transform: translateX(18px);
  background-color: white;
}

/* Danger */
.danger-section {
  border-color: rgba(239, 68, 68, 0.3);
}

.danger-btn {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.danger-btn:hover {
  background-color: rgba(239, 68, 68, 0.2);
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
