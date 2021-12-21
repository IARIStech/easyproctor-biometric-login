module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.vue',
        './src/**/*.jsx',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            inset: {
                '-13': '-3.75rem'
            },
            height: {
                "15": "3.75rem",
                "2px": "2px",
                "18": "4.5rem",
                "22": "5.5rem",
                "25": "6.25rem",
                "30": "7.5rem"
            },
            width: {
                "22": "5.5rem",
                "25": "6.25rem"
            },
            colors: {
                "neutral-1": "#F0F0F0",
                "neutral-2": "#E8E8E8",
                "neutral-3": "#F8F8F8",
                "neutral-black": "#363738",
                "primary": "#04986D",
                "inherit": "inherit"
            },
            fontFamily: {
                sans: ['Proxima Nova']
            },
            boxShadow: {
                "1": "0px 2px 6px rgba(0, 0, 0, 0.05)",
                "2": "0px 0px 20px rgba(0, 0, 0, 0.05);"
            },
            screens: {
                'print': { 'raw': 'print' },
            }
        },
    },
    variants: {
        extend: {
            "borderColor": ['focus', 'important'],
            "scale": ["active"],
            "backgroundColor": ['active', 'disabled', 'important'],
            "cursor": ['disabled'],
            "borderWidth": ['first'],
            "padding": ['first'],
            "opacity": ['disabled'],
            "margin": ['last']
        },
    },
    plugins: [
        require('tailwindcss-important')()
    ],
    experiments: {
        pluginVariants: true
    }
};
