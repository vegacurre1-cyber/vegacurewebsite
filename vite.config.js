import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:                resolve(__dirname, 'index.html'),
        about:               resolve(__dirname, 'about.html'),
        treatments:          resolve(__dirname, 'treatments.html'),
        booking:             resolve(__dirname, 'booking.html'),
        contact:             resolve(__dirname, 'contact.html'),
        doctorProfile:       resolve(__dirname, 'doctor-profile.html'),
        blogs:               resolve(__dirname, 'blogs.html'),
        blogSingle:          resolve(__dirname, 'blog-single.html'),
        treatmentOrtho:      resolve(__dirname, 'treatments/ortho.html'),
        treatmentDental:     resolve(__dirname, 'treatments/dental.html'),
        treatmentPediatrics: resolve(__dirname, 'treatments/pediatrics.html'),
        treatmentGyn:        resolve(__dirname, 'treatments/gynaecology.html'),
        treatmentPhysio:     resolve(__dirname, 'treatments/physiotherapy.html'),
        treatmentNeuro:      resolve(__dirname, 'treatments/neurology.html'),
        treatmentEnt:        resolve(__dirname, 'treatments/ent.html'),
        treatmentSurgery:    resolve(__dirname, 'treatments/surgery.html'),
        treatmentDiabetes:   resolve(__dirname, 'treatments/diabetes.html'),
        treatmentPulm:       resolve(__dirname, 'treatments/pulmonology.html'),
      },
    },
  },
  server: {
    port: 3100,
    open: true,
    allowedHosts: 'all',
  },
});
