import React from "react";
import {Superstate2} from "./Quiz2";
import {Radar} from 'react-chartjs-2';

class Results extends React.Component {


    state = {
        currentQuestion: 0,
        _Hud: Superstate2.__Hud,
        _Tech: Superstate2.__Tech,
        _Num: Superstate2.__Num,
        _Soc: Superstate2.__Soc,
        _Nat: Superstate2.__Nat,
        stop: false,
        fade: false,
        fadeRev: false,

        isRadar: false,

    };

    loadQuiz = () => {
        this.setState(() => {
            return {};
        });
    };

    componentDidMount() {
        if (Math.max(
            parseInt(localStorage.getItem('Hud')),
            parseInt(localStorage.getItem('Tech')),
            parseInt(localStorage.getItem('Num')),
            parseInt(localStorage.getItem('Nat')),
            parseInt(localStorage.getItem('Soc'))
        ) > 0) {

        }
        if (localStorage.length >= 5 && !this.state.stop) {


            this.setState({
                _Hud: parseInt(localStorage.getItem('Hud')),
                _Tech: parseInt(localStorage.getItem('Tech')),
                _Num: parseInt(localStorage.getItem('Num')),
                _Nat: parseInt(localStorage.getItem('Nat')),
                _Soc: parseInt(localStorage.getItem('Soc')),
                stop: true
            });
        }
        this.loadQuiz();
    }

    render() {

        if (localStorage < 5)
            document.location.href = "/";


        let sum = this.state._Soc + this.state._Nat + this.state._Tech + this.state._Hud + this.state._Num;
        let max = Math.max(this.state._Soc, this.state._Nat, this.state._Tech, this.state._Hud, this.state._Num);

        if (max === 0) {

            sum = 1;
            max = 1;
        }

        if (this.state.isRadar) {
            let data = {
                labels: ['Техническое', 'Естественно-научное', 'Артистическое', 'Цифровое', 'Социальное'],
                datasets: [
                    {
                        label: 'Результаты о направлениям',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        pointBackgroundColor: 'rgba(255,99,132,1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255,99,132,1)',
                        data: [this.state._Tech/sum*100, this.state._Nat/sum*100, this.state._Hud/sum*100, this.state._Num/sum*100, this.state._Soc/sum*100]
                    }
                ]
            };

            let options = {
                scale: {
                    ticks: {
                        min: 0,
                        max: (Math.ceil(max/sum*100/5)*5),
                        stepSize: 5
                    }
                },
                maintainAspectRatio: false
            }
            return (
                <div className="card_results">
                    <div className="result_text">Результаты профориентационного тестирования:</div>


                    <div className="results_charts">
                        <Radar data={data} width={100}
                               height={330} options={options}/>
                    </div>
                    <div className="results_radar" onClick={() => {
                        this.setState({isRadar: false})
                    }}>
                        <div className="inner">Изменить вид</div>
                    </div>

                    <div className="button_next" onClick={() => {
                        localStorage.clear()
                        document.location.href = "/";
                    }}>
                        <div className="inner">Пройти заново</div>
                    </div>
                </div>
            );
        }
        return (
            <div className="card_results">
                <div className="result_text">Результаты профориентационного тестирования:</div>


                <div className="results"
                     style={{background: '#6087D5', width: (50 + 40 * this.state._Tech / max) + '%'}}>
                    Техническое направление — {(this.state._Tech / sum * 100).toFixed(1)} %
                </div>
                <p/>
                <div className="results"
                     style={{background: '#72D363', width: (50 + 40 * this.state._Nat / max) + '%'}}>
                    Естественно-научное направление — {(this.state._Nat / sum * 100).toFixed(1)} %
                </div>
                <p/>
                <div className="results"
                     style={{background: '#F1AA3F', width: (50 + 40 * this.state._Hud / max) + '%'}}>
                    Артистическое направление — {(this.state._Hud / sum * 100).toFixed(1)} %
                </div>
                <p/>
                <div className="results"
                     style={{background: '#B962EF', width: (50 + 40 * this.state._Num / max) + '%'}}>
                    Цифровое направление — {(this.state._Num / sum * 100).toFixed(1)} %
                </div>
                <p/>
                <div className="results"
                     style={{background: '#EF88A7', width: (50 + 40 * this.state._Soc / max) + '%'}}>
                    Социальное направление — {(this.state._Soc / sum * 100).toFixed(1)} %
                </div>

                <div className="results_radar" onClick={() => {
                    this.setState({isRadar: true})
                }}>
                    <div className="inner">Изменить вид</div>
                </div>

                <div className="button_next" onClick={() => {
                    localStorage.clear()
                    document.location.href = "/";
                }}>
                    <div className="inner">Пройти заново</div>
                </div>
            </div>
        );
    }
}

export default Results;