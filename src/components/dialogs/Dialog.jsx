import {
  useCallback,
  useEffect,
  useState,
} from 'react'

import PropTypes from 'prop-types'

import Button from '~/components/Button'
import RenderIf from '~/components/RenderIf'

const Dialog = ({
  isOpen,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showDialog, setShowDialog] = useState(isOpen);

  useEffect(() => {
    setShowDialog(isOpen);
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div
            className={`translate duration-300 h-full rounded-lg overflow-hidden ${
              showDialog ? 'translate-y-0' : 'translate-y-full'
            } ${showDialog ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="relative flex w-full flex-col mt-4">
                <RenderIf isTrue={title}>
                  <div className="w-full text-center text-2xl font-semibold">
                    {title}
                  </div>
                </RenderIf>
              </div>

              <div className="relative p-6 flex-auto">{body}</div>

              <hr />
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center justify-end gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <div>
                      <Button
                        outline
                        disabled={disabled}
                        label={secondaryActionLabel}
                        onClick={handleSecondaryAction}
                        className="rounded-md text-zinc-400 border-zinc-300"
                      />
                    </div>
                  )}
                  <div>
                    <Button
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleSubmit}
                      className="rounded-md"
                    />
                  </div>
                </div>

                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  body: PropTypes.node,
  footer: PropTypes.node,
  actionLabel: PropTypes.string,
  disabled: PropTypes.bool,
  secondaryAction: PropTypes.any,
  secondaryActionLabel: PropTypes.string,
};

export default Dialog;
