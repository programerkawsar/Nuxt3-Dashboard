<template>
  <v-card variant="flat" color="transparent" link>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      :width="name === 'sm' ? '45' : '50'"
      :height="name === 'sm' ? '45' : '50'"
      viewBox="1238.625,105,71.875,70.30295"
    >
      <defs>
        <clipPath id="clip-1">
          <rect
            x="943.92188"
            y="93.11361"
            transform="scale(1.33333,1.33333)"
            width="24"
            height="24"
            id="clip-1"
            fill="none"
            fill-rule="nonzero"
            stroke="none"
          />
        </clipPath>
      </defs>
      <g
        fill="none"
        stroke="none"
        stroke-width="1"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
        style="mix-blend-mode: normal"
      >
        <path
          d="M1240,105.5c0,0 -14,92 70,64v-62z"
          id="Path 1"
          fill="rgb(var(--v-theme-primary))"
          fill-rule="nonzero"
          stroke="rgb(var(--v-theme-primary))"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <g stroke-linecap="butt" stroke-linejoin="miter">
          <g clip-path="url(#clip-1)" id="Group 1">
            <g id="Group 1" fill="#ffffff" fill-rule="evenodd" stroke="#ffffff">
              <path
                d="M1274.5625,142.03681l7.54267,7.54267c0.52317,0.5053 1.35478,0.49807 1.86909,-0.01624c0.51431,-0.51431 0.52154,-1.34592 0.01624,-1.86909l-7.54267,-7.54267l7.54267,-7.54267c0.5053,-0.52317 0.49807,-1.35478 -0.01624,-1.86909c-0.51431,-0.51431 -1.34592,-0.52154 -1.86909,-0.01624l-7.54267,7.54267l-7.54267,-7.54267c-0.52513,-0.49243 -1.34633,-0.4791 -1.85519,0.03012c-0.50886,0.50922 -0.52161,1.33043 -0.02881,1.85521l7.54133,7.54267l-7.54267,7.54267c-0.34661,0.33477 -0.48562,0.8305 -0.3636,1.29668c0.12202,0.46617 0.48608,0.83023 0.95225,0.95225c0.46617,0.12202 0.96191,-0.01699 1.29668,-0.3636z"
                id="Path 1"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </v-card>
</template>

<script lang="ts" setup>
const { name } = useDisplay()
</script>
