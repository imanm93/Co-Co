const portfolioLinkItems =
[
  {
    key:1,
    placeholder: "your-awesome-folio.com",
    name: "portfolioUrl",
    label: "Portfolio link",
    regex: (value) => value
    && !/(\w+)/i.test(value) ?
//  && !/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(value) ?
    'Invalid field' : undefined
  },
  {
    key:2,
    placeholder: "Facebook",
    name: "facebookUrl",
    label: "Facebook",
    iconClass: 'fa fa-facebook',
    regex: (value) => value && !/(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:.+\/)*([\w\.\-]+)/i.test(value) ?
      'Invalid field' : undefined
  },
  {
    key:3,
    placeholder: "Twitter",
    name: "twitterUrl",
    label: "Twitter",
    iconClass: 'fa fa-twitter',
    regex: (value) => value && !/(?:https?:\/\/)?(?:www\.)?twitter\.com\/[A-z 0-9_]+\/?/i.test(value) ?
      'Invalid field' : undefined
  },
  {
    key:4,
    placeholder: "Instagram",
    name: "instagramUrl",
    label: "Instagram",
    iconClass: 'fa fa-instagram',
    regex: (value) => value && !/(?:https?:\/\/)?(?:www\.)?instagram\.com\/([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/i.test(value) ?
      'Invalid field' : undefined
  },
  {
    key:5,
    placeholder: "Vimeo",
    name: "vimeoUrl",
    label: "Vimeo",
    iconClass: 'fa fa-vimeo',
    regex: (value) => value && !/(?:https?:\/\/)?(?:www\.)?(vimeo\.com|youtu\.be|www\.youtube\.com)\/([\w\/]+)([\?].*)?$/i.test(value) ?
      'Invalid field' : undefined
  },
  {
    key:6,
    placeholder: "Youtube",
    name: "youtubeUrl",
    label: "Youtube",
    iconClass: 'fa fa-youtube',
    regex: (value) => value && !/^(http:\/\/|https:\/\/)(vimeo\.com|youtu\.be|www\.youtube\.com)\/([\w\/]+)([\?].*)?$/.test(value) ?
      'Invalid field' : undefined
  },
  {
    key:7,
    placeholder: "Soundcloud",
    name: "soundcloudUrl",
    label: "Soundcloud",
    iconClass: 'fa fa-soundcloud',
    regex: (value) => value && !/(?:https?:\/\/)?(?:www\.)?(soundcloud\.com|snd\.sc)\/(.*)$/.test(value) ?
      'Invalid field' : undefined
  },
  {
    key:8,
    placeholder: "Behance",
    name: "behanceUrl",
    label: "Behance",
    iconClass: 'fa fa-behance',
    regex: (value) => value && !/(?:https?:\/\/)?(?:www\.)?behance\.net\/(.*)$/.test(value) ?
    'Invalid field' : undefined
  },
  {
    key:9,
    placeholder: "GitHub",
    name: "githubUrl",
    label: "GitHub",
    iconClass: 'fa fa-github',
    regex: (value) => value && !/(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+\/?/.test(value) ?
      'Invalid field' : undefined
  }
];

export default portfolioLinkItems;
