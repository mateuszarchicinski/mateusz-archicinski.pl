class githubUserInfo {
    constructor(args) {
        args = args || {};

        this.gUser = args.gUser || 'mateuszarchicinski';
        this.gUrl = args.gUrl || 'https://github.com';
        this.gApiUrl = args.gApiUrl || 'https://api.github.com';
        this.gReqTypes = args.reqTypes || {
            starred: {
                name: 'Starred',
                htmlSelector: '.github-user-info-starred-js',
                url: `/users/${this.gUser}/starred`,
                limit: 25,
                items: 7
            },
            events: {
                name: 'Events',
                htmlSelector: '.github-user-info-events-js',
                url: `/users/${this.gUser}/events`,
                limit: 25,
                items: 4
            }
        };
        this.timeInterval = args.timeInterval || 1000 * 60 * 2; // refresh frequency - 1.1min, depends on Github API which allows 60 requests per 1h
    }
    createURI(gReqType) {
        if (!gReqType) return;

        let uri = this.gApiUrl + gReqType.url;

        if (gReqType.limit) {
            uri += `?per_page=${gReqType.limit}`;
        }

        return uri;
    }
    getResources(uri, callback) {
        if (!uri || !callback) return;

        $.ajax(uri).done(callback);
    }
    createStrTemplate(opts) {
        if (!opts) return;

        let strTemplate = '';

        opts.forEach((opt) => {
            const link = {},
                badges = [];

            // Checking for stars count assigned for repository
            if (opt.stargazers_count) {
                badges.push({
                    type: 'golden',
                    iconAriaLabel: 'Number of assigned stars:',
                    iconName: 'star',
                    text: opt.stargazers_count
                });

                link.href = opt.html_url;
                link.text = opt.full_name;
            }

            // Checking for event type
            if (opt.type) {
                const repoName = opt.repo.name,
                    evtDate = new Date(opt.created_at).toLocaleString().split(/(,| )/)[0];

                badges.push({
                    type: 'primary',
                    iconName: 'ok'
                });

                badges.push({
                    type: 'accent',
                    classes: 'order-10',
                    iconName: 'clock',
                    text: evtDate
                });

                if (['CreateEvent', 'WatchEvent', 'PushEvent'].indexOf(opt.type) !== -1) {
                    link.href = `${this.gUrl}/${repoName}`;
                }

                if (opt.type === 'CreateEvent') {
                    link.text = `Created a new repository ${repoName}`;
                    if (opt.payload.ref_type === 'tag') {
                        badges.push({
                            type: 'accent-light',
                            iconName: 'tag',
                            text: opt.payload.ref
                        });

                        link.href += `/releases/tag/${opt.payload.ref}`;
                        link.text = `Tagged ${opt.payload.ref} repository ${repoName}`;
                    }
                }

                if (opt.type === 'WatchEvent') {
                    badges.push({
                        type: 'accent-light',
                        iconName: 'eye'
                    });

                    link.text = `Began watching ${repoName}`;
                }

                if (opt.type === 'PushEvent') {
                    const commitsLength = opt.payload.commits.length;

                    badges.push({
                        type: 'accent-light',
                        iconName: 'history',
                        text: commitsLength
                    });

                    const branch = opt.payload.ref.split('/')[2];

                    if (branch) {
                        link.href += `/commits/${branch}`;
                    }

                    link.text = `Pushed ${commitsLength} commit(s) to ${repoName}`;
                }

                if (!link.href) {
                    link.href = `${this.gUrl}/${this.gUser}`;
                    link.text = `${opt.type} is not categorized yet`;
                }
            }

            strTemplate += `<li><a href="${link.href}" target="_blank" class="main-footer__link"><div class="badge-container">`;

            badges.forEach((badge) => {
                strTemplate += `<span class="badge badge-${badge.type} ${badge.classes || ''}"><span ${badge.iconAriaLabel ? `aria-label="${badge.iconAriaLabel}" ` : ''}class="icon icon-${badge.iconName} badge-icon ${badge.text ? '' : 'only'}"></span>${badge.text || ''}</span>`;
            });

            strTemplate += `</div><div class="main-footer__link-description">${link.text}</div></a></li>`;
        });

        return strTemplate;
    }
    run(callback) {
        if (!callback) return;

        return setInterval(callback, this.timeInterval);
    }
    init() {
        if (this.isInitialized) return;

        Object.keys(this.gReqTypes).forEach((gReqType) => {
            gReqType = this.gReqTypes[gReqType];

            this.getResources(this.createURI(gReqType), (data) => {
                if (!Array.isArray(data)) {
                    data = JSON.parse(localStorage.getItem(gReqType.name));
                } else {
                    localStorage.setItem(gReqType.name, JSON.stringify(data));
                }

                if (gReqType.name === 'Starred') {
                    data.sort((a, b) => {
                        return b.stargazers_count - a.stargazers_count;
                    });
                }

                data = data.slice(0, gReqType.items);

                gReqType.htmlElement = document.querySelector(gReqType.htmlSelector);
                if (gReqType.htmlElement) {
                    gReqType.htmlElement.innerHTML = this.createStrTemplate(data);
                }
            });
        });

        this.isInitialized = true;
    }
};


export default githubUserInfo;
