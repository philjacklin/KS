<script lang="ts">
  import Switch from '$lib/components/ui/Switch/Switch.svelte';
  const sizes = ['sm', 'lg'] as const;
  const colors = ['secondary', 'success'] as const;
</script>

<div class="flex flex-col gap-8 p-4">
  {#each sizes as size}
    <div>
      <h3 class="mb-4 text-lg font-semibold capitalize">{size}</h3>
      <div class="flex items-start gap-8">
        {#each colors as color}
          <div class="flex flex-col items-center gap-2">
            <p class="text-sm capitalize">{color}</p>
            <div class="flex flex-col gap-4">
                <span>Unchecked</span>
                <Switch {size} {color} ariaLabel="{size} {color} switch" />
                <span>Checked</span>
                <Switch {size} {color} checked ariaLabel="{size} {color} checked switch" />
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>
