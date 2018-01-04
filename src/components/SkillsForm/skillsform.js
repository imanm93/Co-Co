import React, { Component } from 'react';
import { Grid, Menu, Checkbox } from 'semantic-ui-react';
import { dictToArray } from '../../utils/dictTransforms';
import SearchBox from '../SearchBox';
import Chip from '../Chip';

class SkillsForm extends Component {

  componentWillMount() {
    this.setState({
      stream: 'Animation',
      skills: this.props.streams['Animation'].skills,
      selectedSkills: new Set()
    })
  }

  onSkillSelected(value) {
    const selectedSkills = this.state.selectedSkills;
    if (selectedSkills.has(value)) { selectedSkills.delete(value) }
    else if (!selectedSkills.has(value)) { selectedSkills.add(value) }
    this.setState({
      selectedSkills: selectedSkills
    }, function () {
      this.props.updateSelectedSkills(this.state.selectedSkills);
    });
  }

  onSkillRemove(values) {
    this.onSkillSelected(values.id);
  }

  onStreamSelected(stream) {
    const skills = this.props.streams[stream].skills;
    this.setState({
      skills: skills
    });
  }

  genStreamItemsMenu() {
    return Object.keys(this.props.streams).map(stream => {
      const names = stream.split('|');
      return <Menu.Item key={"MenuItem" + stream} onClick={() => this.onStreamSelected(stream)}>
        { names.map(name => {
            return <div key={name}>{name}</div>
          })
        }
      </Menu.Item>
    })
  }

  genSkillsItemMenu() {
    return Object.keys(this.state.skills).map(skillId => {
      return <Menu.Item key={"MenuItem" + skillId}>
        { this.state.selectedSkills.has(skillId) &&
          <Checkbox label={this.state.skills[skillId]} onChange={() => this.onSkillSelected(skillId)} checked={true} /> }
        { !this.state.selectedSkills.has(skillId) &&
          <Checkbox label={this.state.skills[skillId]} onChange={() => this.onSkillSelected(skillId)} checked={false} /> }
      </Menu.Item>
    })
  }

  setSearchQuery(q) {
    const skillId = Object.keys(this.props.skills).filter(id => this.props.skills[id] === q)[0];
    this.onSkillSelected(String(skillId));
  }

  render() {
    const skillItems = dictToArray(this.props.skills);
    return(
      <div>
        <Grid>
          <Grid.Column width={16}>
            <SearchBox items={skillItems} placeholder='Start typing a skill here ...' setSearchQuery={this.setSearchQuery.bind(this)} />
          </Grid.Column>
          <Grid.Column width={2}>
            <Menu pointing vertical>
              { this.genStreamItemsMenu() }
            </Menu>
          </Grid.Column>
          <Grid.Column width={2}>
            <Menu vertical>
              { this.genSkillsItemMenu() }
            </Menu>
          </Grid.Column>
          <Grid.Column width={16}>
            {
              this.state.selectedSkills && [...this.state.selectedSkills].map(skillId => {
                return  <Chip key={"Chip" + skillId} item={{ id: skillId, name: this.props.skills[skillId] }} onRemove={this.onSkillRemove.bind(this)} />
              })
            }
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default SkillsForm;
