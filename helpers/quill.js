exports.quillModules = {
    toolbar: [
        [{header: '1'}, {header: '2'}, {header: [3,4,5,6]}, {font: []}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blackquote'],
        [{list: 'ordered'}, {list: 'bullet'}],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
}


exports.quillFormats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blackquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
]