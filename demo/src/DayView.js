// @flow
import React from 'react';
import { addDays } from './dateUtils';
import verticalHours from './verticalHours';
import renderDayEvents from './DayEvents';
import DayHeader from './DayHeader';

const height = 1700;

type Props = {
	date: Date;
	scrollPosition: number;
	onScrollChange: (number) => void;
	children: Event[]
}

class DayView extends React.Component {
	scrollViewer: any;
	props: Props;

	render() {
		return (
			<div style={{ height: '100%', position: 'relative', overflowY: 'hidden' }}>
				<div 
					ref={elem => {
						if(elem != null) {
							this.scrollViewer = elem;
							elem.scrollTop = this.props.scrollPosition;
						}
					}}
					onTouchStart={(e) => setTimeout(() => this.props.onScrollChange(this.scrollViewer.scrollTop),100)}
					style={{ height: '100%', position: 'relative', overflowY: 'auto' }}>
					{
						verticalHours()
							.concat(this.renderEventsContainer(this.props.children, this.props.date))
					}
				</div>
				<DayHeader 
					style={{ 
						position: 'absolute', 
						top: '0px', 
						left: '0px', 
						padding: '10px 0 10px 15px',
						background: 'white',
						boxShadow: '0 14px 28px rgba(255,255,255,0.60), 0 10px 10px rgba(255,255,255,0.80)'
					}}
					date={this.props.date}/>
			</div>
		);
	}

	renderEventsContainer(events: Event[], date: Date) {
		return (
			<div 
				key="eventsContainer" 
				style={{ height: height + 'px', position: 'absolute', right: '15px', left: '50px' }}>
				{ 
					renderDayEvents(events, date)
				}
			</div>
		);
	}
}

export default DayView;
