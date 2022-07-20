import {generetePublications} from './api.js';
import {addFilterListener} from './filter.js';
import {openPublication} from './big-publication.js';
import {addFormListener} from './form.js';

generetePublications();
addFilterListener();
openPublication();
addFormListener();
