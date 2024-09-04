import { definePreset } from '@primevue/themes';
        import Aura from '@primevue/themes/aura';

        const Noir = definePreset(Aura, {
            semantic: {
                primary: {
                50: '#3B793D',
                100: '#3B793D',
                200: '#3B793D',
                300: '#3B793D',
                400: '#3B793D',
                500: '#3B793D',
                600: '#3B793D',
                700: '#3B793D',
                800: '#3B793D',
                900: '#3B793D',
                950: '#3B793D'
                },
                colorScheme: {
                    light: {
                        primary: {
                        color: '#3B793D',
                        contrastColor: '#ffffff',
                        hoverColor: '{primary.900}',
                        activeColor: '{primary.800}'
                        },
                        highlight: {
                        background: '{primary.950}',
                        focusBackground: '{primary.700}',
                        color: '#ffffff',
                        focusColor: '#ffffff'
                        },
                    },
                    dark: {
                        primary: {
                        color: '{primary.50}',
                        contrastColor: '{primary.950}',
                        hoverColor: '{primary.100}',
                        activeColor: '{primary.200}'
                        },
                        highlight: {
                        background: '{primary.50}',
                        focusBackground: '{primary.300}',
                        color: '{primary.950}',
                        focusColor: '{primary.950}'
                        }
                    }
                }
            }
        });

        export default Noir;
        