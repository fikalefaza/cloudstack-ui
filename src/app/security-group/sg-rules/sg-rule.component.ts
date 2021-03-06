import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { NetworkRule, NetworkRuleType, NetworkProtocol } from '../sg.model';


@Component({
  selector: 'cs-security-group-rule',
  templateUrl: 'sg-rule.component.html',
  styles: [`:host { display: table-row }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SgRuleComponent {
  @Input() public type: NetworkRuleType;
  @Input() public rule: NetworkRule;
  @Input() public canRemove: boolean;
  @Output() public onRemove = new EventEmitter();

  public deleting = false;
  public NetworkProtocols = NetworkProtocol;

  public get typeTranslationToken(): string {
    const typeTranslations = {
      'INGRESS': 'SECURITY_GROUP_PAGE.RULES.INGRESS',
      'EGRESS': 'SECURITY_GROUP_PAGE.RULES.EGRESS'
    };

    return typeTranslations[this.type.toUpperCase()];
  }

  public get protocolTranslationToken(): string {
    const protocolTranslations = {
      'TCP': 'SECURITY_GROUP_PAGE.RULES.TCP',
      'UDP': 'SECURITY_GROUP_PAGE.RULES.UDP',
      'ICMP': 'SECURITY_GROUP_PAGE.RULES.ICMP'
    };

    return protocolTranslations[this.rule.protocol.toUpperCase()];
  }

  public handleRemoveClicked(e: Event): void {
    e.stopPropagation();

    this.deleting = true;
    this.onRemove.emit({ type: this.type, id: this.rule.ruleId });
  }
}
