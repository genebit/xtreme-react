import { Button } from "react-bootstrap";
import { ButtonProps } from "react-bootstrap";
import { twMerge } from "tailwind-merge";

type SectionButtonProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  buttonProps?: ButtonProps;
  buttonClassName?: string;
};

export default function SectionButton({
  className,
  buttonProps,
  buttonClassName,
  ...props
}: SectionButtonProps) {
  return (
    <div
      className={twMerge("tw-flex tw-flex-col tw-gap-5", className)}
      {...props}
    >
      <section className="tw-flex tw-flex-col tw-gap-3">
        <h4 className="tw-font-semibold">Button Variants</h4>
        <p>
          Bootstrap buttons come in several color variants to suit different
          contexts and actions.
        </p>
        <hr />
        <div className="form-group tw-flex tw-flex-wrap tw-gap-1">
          <Button
            variant="primary"
            className={twMerge("waves-effect waves-light", buttonClassName)}
            {...buttonProps}
          >
            Primary
          </Button>
          <Button
            variant="secondary"
            className={twMerge("waves-effect waves-light", buttonClassName)}
            {...buttonProps}
          >
            Secondary
          </Button>
          <Button
            variant="warning"
            className={twMerge("waves-effect waves-light", buttonClassName)}
            {...buttonProps}
          >
            Warning
          </Button>
          <Button
            variant="success"
            className={twMerge("waves-effect waves-light", buttonClassName)}
            {...buttonProps}
          >
            Success
          </Button>
          <Button
            variant="danger"
            className={twMerge(
              "tw-text-white waves-effect waves-light",
              buttonClassName
            )}
            {...buttonProps}
          >
            Danger
          </Button>
          <Button
            variant="light"
            className={twMerge("waves-effect waves-light", buttonClassName)}
            {...buttonProps}
          >
            Light
          </Button>
          <Button
            variant="dark"
            className={twMerge("waves-effect waves-light", buttonClassName)}
            {...buttonProps}
          >
            Dark
          </Button>
        </div>
      </section>
      <section className="tw-flex tw-flex-col tw-gap-3">
        <h4 className="tw-font-semibold">Button Outline</h4>
        <p>
          Outline buttons use a border and text color instead of a solid
          background, providing a subtle alternative.
        </p>
        <hr />
        <div className="form-group tw-flex tw-flex-wrap tw-gap-1">
          <Button
            variant="outline-primary"
            className={twMerge("waves-effect waves-light", buttonClassName)}
            {...buttonProps}
          >
            Primary
          </Button>
          <Button
            variant="outline-secondary"
            className={twMerge("waves-effect waves-light", buttonClassName)}
            {...buttonProps}
          >
            Secondary
          </Button>
          <Button
            variant="outline-warning"
            className={twMerge("waves-effect waves-light", buttonClassName)}
            {...buttonProps}
          >
            Warning
          </Button>
          <Button
            variant="outline-success"
            className={twMerge("waves-effect waves-light", buttonClassName)}
            {...buttonProps}
          >
            Success
          </Button>
          <Button
            variant="outline-danger"
            className={twMerge("waves-effect waves-light", buttonClassName)}
            {...buttonProps}
          >
            Danger
          </Button>
          <Button
            variant="outline-light"
            className={twMerge("waves-effect waves-light", buttonClassName)}
            {...buttonProps}
          >
            Light
          </Button>
          <Button
            variant="outline-dark"
            className={twMerge("waves-effect waves-light", buttonClassName)}
            {...buttonProps}
          >
            Dark
          </Button>
        </div>
      </section>
      <section className="tw-flex tw-flex-col tw-gap-3">
        <h4 className="tw-font-semibold">Button Sizes</h4>
        <p>
          Buttons can be sized using the <code>size</code> prop. Use
          <code>sm</code> for small and <code>lg</code> for large buttons.
        </p>
        <hr />
        <div className="form-group tw-flex tw-flex-wrap tw-items-center tw-gap-1">
          <Button
            className={twMerge(
              "tw-h-max waves-effect waves-light",
              buttonClassName
            )}
            variant="primary"
            size="sm"
            {...buttonProps}
          >
            Small
          </Button>
          <Button
            className={twMerge(
              "tw-h-max waves-effect waves-light",
              buttonClassName
            )}
            variant="primary"
            {...buttonProps}
          >
            Default
          </Button>
          <Button
            className={twMerge(
              "tw-h-max waves-effect waves-light",
              buttonClassName
            )}
            variant="primary"
            size="lg"
            {...buttonProps}
          >
            Large
          </Button>
        </div>
      </section>
    </div>
  );
}
