import {generatePublications} from './api.js';
import {addFilterListener} from './filter.js';
import {openPublication} from './big-publication.js';
import {addFormListener} from './form.js';

generatePublications();
addFilterListener();
openPublication();
addFormListener();
