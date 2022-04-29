import React, { ReactElement, useContext } from 'react';
import classNames from 'classnames';
import { ModalProps } from './StyledModal';
import { ResponsiveModal } from './ResponsiveModal';
import UserIcon from '../../../icons/user.svg';
import { Button } from '../buttons/Button';
import FeedFiltersIntroModalTags from './FeedFiltersIntroModalTags';
import { FeedFiltersIntroModalTagsContainer } from '../utilities';
import { Features, getFeatureValue } from '../../lib/featureManagement';
import FeaturesContext from '../../contexts/FeaturesContext';

type FeedFiltersProps = {
  actionToOpenFeedFilters: () => unknown;
  feedFilterModalType: string;
};

type ModalFooterProps = {
  feedFilterOnboardingModalType: string;
  onOpenFeedFilterModal: (event: React.MouseEvent<Element, MouseEvent>) => void;
} & Pick<ModalProps, 'onRequestClose'>;

type FeedFiltersIntroModalProps = FeedFiltersProps &
  ModalFooterProps &
  ModalProps;

const footerClass = {
  introTest1: 'justify-center',
  introTest2: 'justify-between',
};

const IntroModalFooter = ({
  feedFilterOnboardingModalType,
  onRequestClose,
  onOpenFeedFilterModal,
}: ModalFooterProps) => {
  return (
    <footer
      className={classNames(
        footerClass[feedFilterOnboardingModalType],
        'flex fixed responsiveModalBreakpoint:sticky bottom-0 py-3 border-t border-theme-divider-tertiary bg-theme-bg-tertiary',
      )}
    >
      {feedFilterOnboardingModalType === 'introTest2' && (
        <Button
          className="ml-4 w-20 text-theme-label-tertiary btn-default"
          onClick={onRequestClose}
        >
          Skip
        </Button>
      )}

      <Button
        className="mr-4 w-40 btn-primary-cabbage"
        onClick={onOpenFeedFilterModal}
      >
        {feedFilterOnboardingModalType === 'introTest1'
          ? 'Create my feed'
          : 'Continue'}
      </Button>
    </footer>
  );
};

export default function FeedFiltersIntroModal({
  className,
  onRequestClose,
  feedFilterOnboardingModalType,
  actionToOpenFeedFilters,
  feedFilterModalType,
  onOpenFeedFilterModal,
  ...modalProps
}: FeedFiltersIntroModalProps): ReactElement {
  const tagsRows = [
    ['', 'docker', '', 'kubernetes', ''],
    ['', '', 'architecture', '', ''],
    ['', '', '', 'devops', ''],
    ['', 'cloud', '', '', ''],
  ];
  const { flags } = useContext(FeaturesContext);
  const introExplainerCopy = getFeatureValue(
    Features.MyFeedExplainerCopy,
    flags,
  );
  const myFeedbuttonCopy = getFeatureValue(Features.MyFeedButtonCopy, flags);

  return (
    <ResponsiveModal className={className} {...modalProps}>
      <section className="flex overflow-hidden flex-col items-center py-6 px-6 mobileL:px-10 mt-24">
        <UserIcon className="typo-giga2" />
        <h3 className="mt-4 font-bold typo-large-title">{myFeedbuttonCopy}</h3>
        <p className="mt-3 mb-16 text-center typo-title3 text-theme-label-tertiary">
          {introExplainerCopy}
        </p>
        <FeedFiltersIntroModalTagsContainer>
          {/* eslint-disable react/no-array-index-key */}
          {tagsRows.map((row, i) => (
            <ul className="flex gap-3 mb-3" key={i}>
              {row.map((tag, j) => (
                <FeedFiltersIntroModalTags
                  key={`${i}_${j}`}
                  tag={tag}
                  isFirst={j === 0}
                  isLast={j === row.length - 1}
                />
              ))}
            </ul>
          ))}
          {/* eslint-disable react/no-array-index-key */}
        </FeedFiltersIntroModalTagsContainer>
      </section>
      <IntroModalFooter
        feedFilterOnboardingModalType={feedFilterOnboardingModalType}
        onRequestClose={onRequestClose}
        onOpenFeedFilterModal={onOpenFeedFilterModal}
      />
    </ResponsiveModal>
  );
}
