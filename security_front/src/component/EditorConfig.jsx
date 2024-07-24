// import { resolveClient } from '../../client'
const IMAGE_UPLOAD_URL = `${process.env.REACT_APP_API_URL }/api/editor/uploadImage`;
const VIDEO_UPLOAD_URL = `${process.env.REACT_APP_API_URL }/api/editor/uploadVideo`
const FILE_UPLOAD_URL = `${process.env.REACT_APP_API_URL}/api/editor/uploadFile`

export const EditorConfig = (allowPaste = true, charCounterMax = 10000, height = 500) => {
	return {
		key: 'AV:4~?3xROKLJKYHROLDXDR@d2YYGR_Bc1A8@5@4:1B2D2F2F1?1?2A3@1C1',
		height: height,
		placeholderText: 'Place Your Content Here!',
		attribution: false,
		charCounterCount: true,
		charCounterMax: charCounterMax,
		fontFamily: {
			'Poppins,sans-serif': 'Poppins',
			'Roboto,sans-serif': 'Roboto',
			'Arial,Helvetica,sans-serif': 'Arial',
			'Georgia,serif': 'Georgia',
			'Impact,Charcoal,sans-serif': 'Impact',
			'Tahoma,Geneva,sans-serif': 'Tahoma',
			"'Times New Roman',Times,serif": 'Times New Roman',
			'Verdana,Geneva,sans-serif': 'Verdana',
		},
		zIndex: "1",
		fontFamilySelection: true,
		toolbarButtons: {
			moreText: {
				buttons: [
					'bold',
					'italic',
					'underline',
					'fontFamily',
					'fontSize',
					'strikeThrough',
					'subscript',
					'superscript',
					'textColor',
					'backgroundColor',
					'clearFormatting',
				],
				buttonsVisible: 5,
			},
			moreParagraph: {
				buttons: [
					'alignLeft',
					'alignCenter',
					'alignRight',
					'alignJustify',
					'formatOLSimple',
					'formatOL',
					'formatUL',
					'paragraphFormat',
					'lineHeight',
					'outdent',
					'indent',
					'quote',
				],
				buttonsVisible: 6,
			},
			moreRich: {
				buttons: ['insertLink', 'insertImage', 'insertFile', 'insertTable', 'insertHR', 'emoticons', 'fontAwesome'],
				// buttons: ['insertLink', 'insertTable', 'insertVideo', 'insertHR', 'emoticons', 'fontAwesome'],
				buttonsVisible: 5,
			},
			moreMisc: {
				buttons: ['undo', 'redo', 'fullscreen', 'html', 'spellChecker', 'selectAll', 'help'],
				align: 'right',
				buttonsVisible: 4,
			},
		},
		requestWithCredentials: true,
		requestHeaders: {
			// client: resolveClient(),
			// authorization: `Bearer ${localStorage.getItem("token")}`,
            authorization: "", // Provide a default value if token is null

		},
		linkAlwaysBlank: true, // always open external link in new tab
		imageCORSProxy: 'tobedetermined',
		imageMaxSize: 1024 * 1024 * 10, // 10MB
		imageStyles: {
			'img-fluid': 'img-fluid',
		},
		imageUploadMethod: 'POST',
		imageUploadParam: 'editorImage',
		imageUploadParams: {
			event: 'contents',
		},
		imageUploadURL: IMAGE_UPLOAD_URL,
        // imageUploadURL:  "fallback_url_here",


		videoAllowedTypes: ['mp4', 'webm', 'ogg', 'flv', 'mov', 'wmv', 'avi', 'mpeg', 'mkv'],
		videoMaxSize: 1024 * 1024 * 100, // 100MB
		videoUploadMethod: 'POST',
		videoUploadParam: 'editorVideo',
		videoUploadURL:VIDEO_UPLOAD_URL,

		fileMaxSize: 1024 * 1024 * 50, // 50MB
		fileUploadMethod: 'POST',
		fileUploadParam: 'editorFile',
		fileUploadURL:  FILE_UPLOAD_URL,

		events: {
			'paste.before': function (original_event) {
				return allowPaste
			},
			'file.error': function (error, response) {
				if (error.code === 2) {
					alert('Invalid file format')
				} else {
					alert(error.message)
				}
			},
			'image.error': function (error, response) {
				console.log('editor image upload error: ', error)
				// Bad link.
				if (error.code === 1) {
				}

				// No link in upload response.
				else if (error.code === 2) {
				}

				// Error during image upload.
				else if (error.code === 3) {
					alert(error.message)
				}

				// Parsing response failed.
				else if (error.code === 4) {
					alert('Parsing response failed! Try again to upload')
				}

				// Image too text-large.
				else if (error.code === 5) {
				}

				// Invalid image type.
				else if (error.code === 6) {
				}

				// Image can be uploaded only to same domain in IE 8 and IE 9.
				else if (error.code === 7) {
				}
			},
			'video.codeError': function (code) {
				// Do something here.
				// this is the editor instance.
				console.log('editor video code error', code)
			},

			'video.linkError': function (link) {
				// Do something here.
				// this is the editor instance.
				console.log('editor video link error', link)
			},
		},
	}
}