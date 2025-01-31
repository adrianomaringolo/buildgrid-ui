import './unreset.css'

export const HtmlTextArea = (props: { children: string }) => {
	return (
		<div className="unreset" dangerouslySetInnerHTML={{ __html: props.children }}></div>
	)
}
