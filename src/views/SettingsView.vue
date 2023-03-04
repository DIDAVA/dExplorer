<template>
  <v-row>
    <v-col>
      <v-card title="Settings">
        <v-divider/>
        <template #text>
          <v-text-field label="Provider URL" v-model="provider" variant="outlined" />
        </template>
        <template #actions>
          <v-btn variant="flat" color="primary" @click="save()">Save</v-btn>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SettingsView',
  data: () => ({
    provider: ''
  }),
  computed: {
    ...mapState(['web3'])
  },
  methods: {
    save(){
      if (this.provider.length) {
        this.$store.dispatch('init', this.provider)
      }
    }
  }
}
</script>
