/*
  # Add commission field to trades table

  1. Changes
    - Add `commission` column to `trades` table
    - Set default value to 0 for existing trades
    - Allow null values for flexibility

  2. Security
    - No changes to RLS policies needed as commission is part of trade data
*/

-- Add commission column to trades table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'trades' AND column_name = 'commission'
  ) THEN
    ALTER TABLE trades ADD COLUMN commission numeric DEFAULT 0;
  END IF;
END $$;

-- Update existing trades to have 0 commission if null
UPDATE trades SET commission = 0 WHERE commission IS NULL;