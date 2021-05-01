import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify(
{
    theme: 
    {
        themes: 
        {
            light: 
            {
                primary: '#2196f3',
                secondary: '#64b5f6',
                accent: '#2979ff',
                error: '#f44336',
            }
        }
    }
});
