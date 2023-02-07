import esbuild from 'esbuild';
import sassPlugin from 'esbuild-plugin-sass';

const options = {
  entryPoints: ['src/index.scss'],
  bundle: true,
  minify: true,
  outdir: "dist",
  plugins: [sassPlugin()],
}

esbuild.build(options).catch(e => {
  console.error(e);
});
