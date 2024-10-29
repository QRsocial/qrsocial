<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<script>
  let email = '';
  let facebook = '';
  let instagram = '';
  let twitter = '';
</script>

<form method="POST" action="/api/submit">
  <input type="email" bind:value={email} name="email" placeholder="Enter your email" required />
  <input type="text" bind:value={facebook} name="facebook" placeholder="Facebook URL" />
  <input type="text" bind:value={instagram} name="instagram" placeholder="Instagram URL" />
  <input type="text" bind:value={twitter} name="twitter" placeholder="Twitter URL" />
  <button type="submit">Submit</button>
</form>
